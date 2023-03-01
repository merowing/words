import { useState } from 'react';
import NewWord from './NewWord';
import Menu from './Menu';
import TodaysWords from './TodaysWords';
import AllWords from './AllWords';
import RandomWords from './RandomWords';

function Main() {
    
    const [total_words, set_total_words] = useState(0);
    const [local_storage_size, set_local_storage_size] = useState(`${local_storage_get_size()}%`);
    const [page, set_page] = useState('Menu');

    const pages = {
        "Menu": <Menu
            total_words={total_words}
            local_storage_size={local_storage_size}
            change_page_name={change_page_name}
        />,
        // "Today's words": <TodaysWords
        //     set_page_index={set_page_index}
        // />,
        "New word": <NewWord
            change_page_name={change_page_name}
            add_to_local_storage={add_to_local_storage}
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

    function add_to_local_storage(data) {
        const json = localStorage.getItem("words");
        const words = (json)
            ? JSON.parse(json)
            : [];

        words.push(data);
        localStorage.setItem("words", JSON.stringify(words));
        
        update_local_storage_size();
    }

    function update_local_storage_size() {
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
