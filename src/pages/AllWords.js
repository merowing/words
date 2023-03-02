import {useState} from 'react';
import Close from './Close';
import '../AllWords.css';

function AllWords({words, change_page_name}) {

    let [list, set_list] = useState(words);
    let [ids, set_ids] = useState([]);

    function select_word(event) {
        if(event.target.tagName === 'SPAN') {
            const id = event.target.id;

            if(!event.target.classList.contains('select')) {
                event.target.classList.add('select');
                set_ids([...ids, id]);
            }else {
                event.target.classList.remove('select');
                const temp_ids = ids.filter(num => id !== num);
                set_ids(temp_ids);
            }
        }
    }

    function search_word(event) {
        const search = event.target.value;
        const data = words.filter(item => item.name.indexOf(search) !== -1);
        set_list(data);
    }

    return (
        <>
            <Close change_page_name={change_page_name} />
            <div className='search'>
                <input type='text' placeholder='Search' onChange={(event) => search_word(event)} />
            </div>
            <div className='words' onClick={(event) => select_word(event)}>
                {
                    list.map((word, i) => {
                        let class_name = '';
                        if(word.id) {
                            class_name = (ids.includes(word.id.toString()))
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
