import Close from './buttons/Close';
import RefreshButton from './buttons/Refresh';
import Remove from './buttons/Remove';
import Learn from './buttons/Learn';

function Top({change_page_name, refresh, all_words, page_name}) {
    let buttons = [];

    if(all_words) {
        let {show_control, remove, learn_words, chose_words} = all_words;
        if(show_control) {
            buttons = [
                <Learn
                    change_page_name={change_page_name}
                    learn_words={learn_words}
                    chose_words={chose_words}
                />,
                <Remove remove={remove} />
            ]
        }
    }

    return (
        <div className="top">
            <div className="left_buttons">
                {
                    (refresh)
                        ? <RefreshButton refresh={refresh} />
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
