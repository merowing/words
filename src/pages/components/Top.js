import {Close, Refresh, Remove, Learn, Deselect} from './Buttons.js';

function Top({change_page_name, refresh, all_words, page_name}) {
    let buttons = [];

    if (all_words) {
        let {show_control, remove, clean, learn_words, chose_words} = all_words;
        if (show_control) {
            buttons = [
                <Learn
                    key="learn-button"
                    change_page_name={change_page_name}
                    learn_words={learn_words}
                    chose_words={chose_words}
                />,
                <Remove
                    key="remove-button"
                    remove={remove}
                />,
                <Deselect
                    key="clean-button"
                    clean={clean}
                />,
            ]
        }
    }

    return (
        <div className="top">
            <div className="left_buttons">
                {
                    (refresh)
                        ? <Refresh refresh={refresh} />
                        : <></>
                }

                {
                    (all_words)
                        ? buttons
                        : <></>
                }
            </div>
            <Close 
                change_page_name={change_page_name}
                page_name={page_name}
            />
        </div>
    )
}

export default Top;
