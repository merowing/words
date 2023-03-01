import { useState } from 'react';
import NewWord from './NewWord';
import Menu from './Menu';
import TodaysWords from './TodaysWords';
import AllWords from './AllWords';
import RandomWords from './RandomWords';

function Main() {
    
    const [total_words, set_total_words] = useState(0);
    const [local_storage_size, set_local_storage_size] = useState(`${local_storage_get_size()}%`);
    const [page, set_page] = useState(0);

    const pages = [
        <Menu
            total_words={total_words}
            local_storage_size={local_storage_size}
            set_page_index={set_page_index}
        />,
        <TodaysWords
            set_page_index={set_page_index}
        />,
        <NewWord
            set_page_index={set_page_index}
            update_local_storage_size={update_local_storage_size}
        />,
        <AllWords
            set_page_index={set_page_index}
        />,
        <RandomWords
            set_page_index={set_page_index}
        />,
    ];

    function set_page_index(page_index) {
        set_page(page_index);
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
        <div className="main">
            {pages[page]}
        </div>
    )
}

export default Main;
