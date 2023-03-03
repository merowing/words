import Close from './Close';
import '../DailyWords.css';
import { useCallback, useEffect, useState } from 'react';

function DailyWords({change_page_name, words}) {
    const json_string = localStorage.getItem("daily");
    const json = JSON.parse(json_string);
    json.active = false;
    localStorage.setItem("daily", JSON.stringify(json));

    let [current_word, set_current_word] = useState({id: 0, word: words[0]});

    const next_word = useCallback((id) => {
        id = current_word.id + id;
        if(id < 0) {
            id = words.length - 1;
        }
        if(id > words.length - 1) {
            id = 0;
        }

        set_current_word(
            {
                id,
                word: words[id],
            }
        );
    }, [current_word, words]);

    const arrows_press = useCallback((event) => {
        const key = event.key;

        switch(key) {
            case 'ArrowRight':
                next_word(1);
                break;
            case 'ArrowLeft':
                next_word(-1);
                break;
            default:
        }
    }, [next_word]);

    useEffect(() => {
        document.addEventListener('keydown', arrows_press);
        return () => document.removeEventListener('keydown', arrows_press);
    }, [arrows_press]);

    let [mouse_active_name, set_mouse_active_name] = useState(true);
    function change_name() {
        set_mouse_active_name(!mouse_active_name);
    }

    return (
        <>
            <Close change_page_name={change_page_name} />
            <div className='daily_block'>
                <div className='daily_word'>
                    <span className='word'
                        onMouseOver={change_name}
                        onMouseOut={change_name}
                    >{
                        (mouse_active_name)
                            ? current_word.word.name
                            : current_word.word.translate
                    }
                    </span>
                    <span className='example'>{current_word.word.sentence}</span>
                </div>
                <ul>
                    <li>
                        <button onClick={() => next_word(-1)}>Previous</button>
                    </li>
                    <li>
                        <button onClick={() => next_word(1)}>Next</button>
                    </li>
                </ul>
                <div>{`${current_word.id + 1} / ${words.length}`}</div>
            </div>
        </>
    )
}

export default DailyWords;
