import { useState } from 'react';
import NewWord from './NewWord';
import Menu from './Menu';
import DailyWords from './DailyWords';
import AllWords from './AllWords';
import RandomWords from './RandomWords';

function Main() {
    
    const [total_words, set_total_words] = useState(total_words_length());
    const [local_storage_size, set_local_storage_size] = useState(`${local_storage_data_size()}%`);
    const [page, set_page] = useState('Menu');

    const pages = {
        "Menu": <Menu
            change_page_name={change_page_name}
        />,
        "Daily words": <DailyWords
            change_page_name={change_page_name}
            words={local_storage_daily()}
        />,
        "New word": <NewWord
            change_page_name={change_page_name}
            local_storage_add={local_storage_add}
        />,
        "My words": <AllWords
            change_page_name={change_page_name}
            words={local_storage_data()}
            remove_words={local_storage_remove}
        />,
        // "Random Words": <RandomWords
        //     set_page_index={set_page_index}
        // />,
    };

    function change_page_name(page_name) {
        set_page(page_name);
    }

    function total_words_length() {
        const json = localStorage.getItem("words");
        if(json) {
            const data = JSON.parse(json);

            return data.length;
        }

        return 0;
    }

    function local_storage_add(data) {
        const json = localStorage.getItem("words");
        const words = (json)
            ? JSON.parse(json)
            : [];

        let id = (words.length)
            ? parseInt(words.at(-1).id) + 1
            : 0;
        id = id.toString();

        data = {id, ...data};
        words.push(data);
        localStorage.setItem("words", JSON.stringify(words));
        
        local_storage_update();
        set_total_words(words.length);
    }

    function local_storage_update() {
        if(!local_storage_data().length) {
            localStorage.removeItem("words");
        }

        set_local_storage_size(`${local_storage_data_size()}%`);
    }
    function local_storage_data() {
        const data = localStorage.getItem("words");

        return (data)
            ? JSON.parse(data)
            : [];
    }

    function local_storage_data_size() {
        const max_size = 5 * 1024 * 1024;
        let ls_total = 0,
            value_len,
            value;

        for (value in localStorage) {
            if (!Object.hasOwn(localStorage, value) || value === "daily") {
                continue;
            }
            
            value_len = ((localStorage[value].length + value.length) * 2);
            ls_total += value_len;
        };

        const percentage = (1 - ls_total / max_size) * 100;
        return Math.floor(percentage * 100) / 100;
    }

    function local_storage_remove(ids) {
        const json = local_storage_data();

        if(json) {
            const data = json.filter(item => !ids.includes(item.id));
            
            localStorage.setItem("words", JSON.stringify(data));
            local_storage_update();
            set_total_words(total_words_length());
        }
    }

    function local_storage_daily() {
        const json_string = localStorage.getItem("daily");
        if(json_string) {
            return JSON.parse(json_string).words;
        }
    }

    return (
        <>
            <div className='main'>
                {pages[page]}
            </div>
            <footer
                className={
                    (page === 'Daily words' || page === 'Random words')
                        ? 'hidden'
                        : ''
                }
                >
                <div>Available words: {total_words}</div>
                <div>LocalStorage free space: {local_storage_size}</div>
            </footer>
        </>
    )
}

export default Main;
