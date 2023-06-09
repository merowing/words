import { useCallback, useEffect, useState } from "react";

function WordsPage({words, set_listen_word, justifyContent}) {
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

        set_listen_word(words[ind].name);

    }, [id, words, set_listen_word]);

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
            set_listen_word(words[0].name);
    }, [words, set_listen_word]);

    useEffect(() => {
        document.addEventListener('keydown', arrows_press);
        return () => document.removeEventListener('keydown', arrows_press);
    }, [arrows_press]);

    let [mouse_active_name, set_mouse_active_name] = useState(true);
    function toggle_translate() {
        set_mouse_active_name(!mouse_active_name);
    }

    useEffect(() => {
        const body_click = (event) => {
            if (
                event.target.tagName === 'DIV'
                &&
                (
                    event.target.className === 'daily_word'
                    || event.target.id === 'root'
                    || event.target.className === 'inner'
                    || event.target.className === 'daily_block'
                    || event.target.className === 'main'
                )
            ) {
                const screen_width = event.target.offsetWidth;
                const position = event.clientX;

                if (position > screen_width / 2) {
                    next_word(1);
                }
                if (position < screen_width / 2) {
                    next_word(-1);
                }
            }
        }

        document.addEventListener("click", body_click);
        return () => {
            document.removeEventListener("click", body_click);
        }
    });

    return (
        <>
            <div className='daily_block'>
                <div
                    className='daily_word'
                    style={(justifyContent) ? {justifyContent} : {}}
                >
                    <span className='word'
                        onClick={
                            (event) => {
                                event.stopPropagation();
                                toggle_translate();
                            }
                        }
                    >{
                        (mouse_active_name)
                            ? word.name
                            : word.translate
                    }
                    </span>
                    <span className='sentence'>{word.sentence}</span>
                </div>
                <ul>
                    <li className="previous-button">
                        <button
                            type='button'
                            onClick={
                                (event) => {
                                    event.stopPropagation();
                                    next_word(-1);
                                }
                            }
                        >Previous</button>
                    </li>
                    <li>{`${id + 1} / ${words.length}`}</li>
                    <li className="next-button">
                        <button
                            type='button'
                            onClick={
                                (event) => {
                                    event.stopPropagation();
                                    next_word(1);
                                }
                            }
                        >Next</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default WordsPage;
