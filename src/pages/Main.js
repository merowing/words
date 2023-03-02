import { useState } from 'react';
import NewWord from './NewWord';
import Menu from './Menu';
import TodaysWords from './TodaysWords';
import AllWords from './AllWords';
import RandomWords from './RandomWords';

function Main() {
    
    const [total_words, set_total_words] = useState(total_words_length());
    const [local_storage_size, set_local_storage_size] = useState(`${local_storage_get_size()}%`);
    const [page, set_page] = useState('Menu');

    const pages = {
        "Menu": <Menu
            change_page_name={change_page_name}
        />,
        // "Today's words": <TodaysWords
        //     set_page_index={set_page_index}
        // />,
        "New word": <NewWord
            change_page_name={change_page_name}
            local_storage_add={local_storage_add}
        />,
        // "All Words": <AllWords
        //     set_page_index={set_page_index}
        // />,
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

        words.push(data);
        localStorage.setItem("words", JSON.stringify(words));
        
        local_storage_update();
        set_total_words(words.length);
    }

    function local_storage_update() {
        set_local_storage_size(`${local_storage_get_size()}%`);
    }

    function local_storage_get_size() {
        const max_size = 5 * 1024 * 1024;
        let ls_total = 0,
            value_len,
            value;

        for (value in localStorage) {
            if (!Object.hasOwn(localStorage, value)) {
                continue;
            }
            
            value_len = ((localStorage[value].length + value.length) * 2);
            ls_total += value_len;
        };

        const percentage = (1 - ls_total / max_size) * 100;
        return Math.floor(percentage * 100) / 100;
    }

    return (
        <>
            <div className='main'>
                {pages[page]}
            </div>
            <footer>
                <div>Available words: {total_words}</div>
                <div>LocalStorage free space: {local_storage_size}</div>
            </footer>
        </>
    )
}

export default Main;
