import {Close, Refresh, Remove, Learn, Deselect, AddWord, Edit} from './Buttons.js';

function Top({change_page_name, refresh_button, my_words, page_name, form, form_name_button, edit_status}) {
    let buttons = [];

    if (my_words) {
        let {show_control_buttons, learn_words, chose_words, remove_button, deselect_button, edit,} = my_words;
        if (show_control_buttons) {
            buttons = [
                <Learn
                    key="learn-button"
                    change_page_name={change_page_name}
                    learn_words={learn_words}
                    chose_words={chose_words}
                />,
                <Remove
                    key="remove-button"
                    remove={remove_button}
                />,
                (chose_words.length !== 1)
                    ? <Deselect
                        key="clean-button"
                        clean={deselect_button}
                    />
                    : <Edit
                        key="edit-button"
                        edit={edit}
                    />,
            ]
        }
    }

    return (
        <div className="top">
            <div className="left_buttons">
                {
                    (refresh_button)
                        ? <Refresh refresh={refresh_button} />
                        : <></>
                }

                {
                    (my_words)
                        ? buttons
                        : <></>
                }

                {
                    (form)
                        ? <>
                            <AddWord
                                form={form}
                                form_name_button={form_name_button}
                            />
                            <div className='edit_status'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={(!edit_status) ? 'hide' : ''}>
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>
                            </div>
                        </>
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
