export function Close({change_page_name, page_name = "Menu"}) {
    return (
        <button
            onClick={
                () => change_page_name(page_name)
            }
            type='button'
        >Back</button>
    )
}

export function Deselect({clean}) {
    return (
        <button
            onClick={clean}
            type='button'
        >Deselect</button>
    )
}

export function Learn({change_page_name, learn_words, chose_words}) {
    return (
        <button
            onClick={
                () => {
                    learn_words(chose_words);
                    change_page_name("Learn words");
                }
            }
            type='button'
        >Learn</button>
    )
}

export function Refresh({refresh}) {
    return (
        <button
            onClick={refresh}
            type='button'
        >Refresh</button>
    )
}

export function Remove({remove}) {
    return (
        <button
            onClick={remove}
            type='button'
        >Remove</button>
    )
}

export function AddWord({form, form_name_button}) {
    return (
        <button
            form={form}
            type='submit'
        >{form_name_button}</button>
    )
}

export function Edit({edit}) {
    return (
        <button
            onClick={edit}
            type='edit'
        >Edit</button>
    )
}
