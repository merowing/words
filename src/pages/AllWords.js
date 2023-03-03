import {useState} from 'react';
import Search from './Search';
import Top from './Top';
import '../AllWords.css';

function AllWords({words, change_page_name, remove_words, learn_words}) {

    let [list, set_list] = useState(words);
    let [ids, set_ids] = useState([]);
    let [show_control, set_show_control] = useState(false);
    let [chose_words, set_chose_words] = useState([]);

    function select_word(event) {
        if(event.target.tagName === 'SPAN') {
            const id = event.target.id;

            if(!event.target.classList.contains('select')) {
                event.target.classList.add('select');
                set_ids([...ids, id]);
                set_show_control(true);
                set_chose_words([...ids, id]);
            }else {
                event.target.classList.remove('select');
                const temp_ids = ids.filter(num => id !== num);
                set_ids(temp_ids);
                set_chose_words(temp_ids);

                if(!temp_ids.length) {
                    set_show_control(false);
                }
            }
        }
    }

    function search_word(event) {
        const search = event.target.value;
        const data = words.filter(item => item.name.indexOf(search) !== -1);
        set_list(data);
    }

    function remove() {
        if(ids.length) {
            const data = words.filter(word => !ids.includes(word.id));
            set_list(data);
            set_ids([]);
            set_show_control(false);

            remove_words(ids);
        }
    }

    return (
        <>
            {/* <Close change_page_name={change_page_name} />
            {
                (show_control) 
                    ? <Control
                        remove={remove}
                    />
                    : <></>
            } */}
            <Top
                change_page_name={change_page_name}
                all_words={{show_control, remove, learn_words, chose_words}}
            />

            <Search search_word={search_word}/>
            <div className='words' onClick={(event) => select_word(event)}>
                {
                    list.map((word, i) => {
                        let class_name = '';
                        if(word.id) {
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
        </>
    )
}

export default AllWords;
