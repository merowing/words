import { useCallback, useEffect, useState } from "react";

function WordsPage({words}) {
    let [{id, word}, set_current_word] = useState({id: 0, word: words[0]});

    const next_word = useCallback((ind) => {
        ind = id + ind;
        if (ind < 0) {
            ind = words.length - 1;
        }
        if (ind > words.length - 1) {
            ind = 0;
        }

        set_current_word(
            {
                id: ind,
                word: words[ind],
            }
        );
    }, [id, words]);

    const arrows_press = useCallback((event) => {
        const key = event.key;

        switch (key) {
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
        set_current_word({id: 0, word: words[0]});
    }, [words]);

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
            <div className='daily_block'>
                <div className='daily_word'>
                    <span className='word'
                        onClick={change_name}
                    >{
                        (mouse_active_name)
                            ? word.name
                            : word.translate
                    }
                    </span>
                    <span className='sentence'>{word.sentence}</span>
                </div>
                <ul>
                    <li>
                        <button
                            type='button'
                            onClick={() => next_word(-1)}
                        >Previous</button>
                    </li>
                    <li>{`${id + 1} / ${words.length}`}</li>
                    <li>
                        <button
                            type='button'
                            onClick={() => next_word(1)}
                        >Next</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default WordsPage;
