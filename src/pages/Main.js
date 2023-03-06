import { useState } from 'react';
import NewWord from './NewWord';
import EditWord from './EditWord';
import Menu from './Menu';
import DailyWords from './DailyWords';
import MyWords from './MyWords';
import LearnWords from './LearnWords';
import Learn from './Learn';

function Main({show_theme_active, change_theme, show_theme, theme}) {
    const [total_words, set_total_words] = useState(total_words_length());
    const [local_storage_size, set_local_storage_size] = useState(`${local_storage_data_size()}%`);
    const [page, set_page] = useState('Menu');
    const [learn, set_learn] = useState([]);
    const [edit_word, set_edit_word] = useState([]);
    const [listen_word, set_listen_word] = useState('');

    const pages = {
        "Menu": <Menu
            change_page_name={change_page_name}
            words_len={total_words_length()}
        />,
        "Daily words": <DailyWords
            change_page_name={change_page_name}
            listen_button={listen_button}
            set_listen_word={set_listen_word}
        />,
        "New word": <NewWord
            change_page_name={change_page_name}
            local_storage_add={local_storage_add}
        />,
        "Edit word": <EditWord
            change_page_name={change_page_name}
            local_storage_data={local_storage_data()}
            edit_word={edit_word}
        />,
        "My words": <MyWords
            change_page_name={change_page_name}
            words={local_storage_data()}
            remove_words={local_storage_remove}
            learn_words={learn_words}
            edit_button={edit_button}
        />,
        "Learn words": <LearnWords
            change_page_name={change_page_name}
            listen_button={listen_button}
            set_listen_word={set_listen_word}
        />,
        "Learn": <Learn 
            change_page_name={change_page_name}
            words={learn}
            listen_button={listen_button}
            set_listen_word={set_listen_word}
        />,
    };

    function change_page_name(page_name) {
        set_page(page_name);

        show_theme_active(false);
        if (page_name === 'Menu') {
            show_theme_active(true);
        }
    }

    function total_words_length() {
        const json = localStorage.getItem("words");
        if (json) {
            const data = JSON.parse(json);

            return data.length;
        }

        return 0;
    }

    function edit_button(word_index) {

        const words = local_storage_data();
        const word = words.filter((item, i) => parseInt(word_index[0]) === parseInt(item.id));
        const index = words.findIndex(item => parseInt(word_index[0]) === parseInt(item.id));

        if(word.length) {
            set_edit_word([index, word[0]]);
        }
        change_page_name("Edit word");
    }

    function learn_words(learn_words) {

        const data = local_storage_data();
        if (data) {
            let words = [];
            for (let word of data) {
                if (learn_words.includes(word.id)) {
                    words.push(word);
                }
            }
            set_learn(words);
        }
    }

    function listen_button() {
        const synth = window.speechSynthesis;
        if(synth.speaking) {
            synth.cancel();
        }

        if(listen_word) {
            const msg = new SpeechSynthesisUtterance(listen_word.name);
            synth.speak(msg);
        }
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
        if (!local_storage_data().length) {
            localStorage.removeItem("words");
        }

        set_local_storage_size(`${ local_storage_data_size() }%`);
    }

    function local_storage_data() {
        const data = localStorage.getItem("words");

        return (data)
            ? JSON.parse(data)
            : [];
    }

    function local_storage_data_size() {
        const max_size = 5 * 1024 * 1024;
        let value_len = 0;
        let another_len = 0;
        let words_len = 0;

        for (let value in localStorage) {
            if (!Object.hasOwn(localStorage, value)) {
                continue;
            }

            if (value !== "words") {
                value_len = (localStorage[value].length + value.length) * 2;
                another_len += value_len;
            } else {
                words_len = (localStorage[value].length + value.length) * 2;
            }
        };
        
        const percentage = (1 - words_len / (max_size - another_len)) * 100;
        return Math.floor(percentage * 100) / 100;
    }

    function local_storage_remove(ids) {
        const json = local_storage_data();

        if (json) {
            const data = json.filter(item => !ids.includes(item.id));
            
            localStorage.setItem("words", JSON.stringify(data));
            local_storage_update();
            set_total_words(total_words_length());
        }
    }

    return (
        <>
            <div className='main'>
                <div
                    className='theme'
                    onClick={change_theme}
                    style={
                        (show_theme)
                            ? {}
                            : {display: 'none'}
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={(!theme) ? 'active sun' : 'sun'}>
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={(theme) ? 'active' : ''}>
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
                    </svg>
                </div>
                {pages[page]}
            </div>
            <footer
                className={
                    (page === 'Daily words' || page === 'Learn words' || page === 'Learn')
                        ? 'hidden'
                        : ''
                }
                >
                <div>Available words: {total_words}</div>
                <div style={{display: 'flex', gap: '4px', justifyContent: 'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z"/>
                    </svg>
                    <span>localStorage free space: {local_storage_size}</span>
                </div>
            </footer>
        </>
    )
}

export default Main;
