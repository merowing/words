import {useState} from 'react';
import Search from './components/Search';
import Top from './components/Top';
import '../styles/MyWords.css';

function MyWords({words, change_page_name, remove_words, learn_words, edit_button}) {

    let [list, set_list] = useState(words);
    let [ids, set_ids] = useState([]);
    let [show_control_buttons, set_show_control_buttons] = useState(false);
    let [chose_words, set_chose_words] = useState([]);

    function select_word(event) {
        if (event.target.tagName === 'SPAN') {
            const id = event.target.id;

            if (!event.target.classList.contains('select')) {
                event.target.classList.add('select');
                set_ids([...ids, id]);
                if (!show_control_buttons) {
                    set_show_control_buttons(true);
                }
                set_chose_words([...ids, id]);
            } else {
                event.target.classList.remove('select');
                const temp_ids = ids.filter(num => id !== num);
                set_ids(temp_ids);
                set_chose_words(temp_ids);

                if (!temp_ids.length) {
                    set_show_control_buttons(false);
                }
            }
        }
    }

    function search_word(event) {
        const search = event.target.value.toLowerCase();
        let data = words.filter(item => item.name.toLowerCase().indexOf(search) !== -1);

        if (search.length === 1) {
            data = words.filter(item => item.name[0].toLowerCase() === search[0]);
        }

        set_list(data);
    }

    function remove_button() {
        if (ids.length) {
            const data = list.filter(word => !ids.includes(word.id));
            set_list(data);
            set_ids([]);
            set_show_control_buttons(false);

            remove_words(ids);
        }
    }

    function deselect_button() {
        set_ids([]);
        set_show_control_buttons(false);
    }

    function edit() {
        edit_button(ids);
    }

    function select_all_button() {
        const ids = list.map(word => word.id);

        if(ids.length) {
            set_ids(ids);
            set_chose_words(ids);
            set_show_control_buttons(true);
        }
    }

    return (
        <>
            <Top
                change_page_name={change_page_name}
                select_all_button={select_all_button}
                my_words={
                    {
                        show_control_buttons,
                        learn_words,
                        chose_words,
                        remove_button,
                        deselect_button,
                        edit,
                    }
                }
            />

            <Search search_word={search_word}/>
            <div className='words_wrapper'>
                <div className='words' onClick={select_word}>
                    {
                        list.map((word, i) => {
                            let class_name = '';
                            if (word.id) {
                                class_name = (ids.includes(word.id))
                                    ? 'select'
                                    : '';
                            }

                            return (
                                <span
                                    key={`${word.name}-${i}`}
                                    id={word.id}
                                    className={class_name}
                                >{word.name}</span>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MyWords;
