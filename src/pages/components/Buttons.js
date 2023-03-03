export function Close({change_page_name, page_name = "Menu"}) {
    return (
        <button
            onClick={
                () => change_page_name(page_name)
            }
        >Back</button>
    )
}

export function Deselect({clean}) {
    return (
        <button
            onClick={clean}
        >Deselect</button>
    )
}

export function Learn({change_page_name, learn_words, chose_words}) {
    return (
        <button onClick={
            () => {
                learn_words(chose_words);
                change_page_name("Learn words");
            }
        }
        >Learn</button>
    )
}

export function Refresh({refresh}) {
    return (
        <button
            onClick={refresh}
        >Refresh</button>
    )
}

export function Remove({remove}) {
    return (
        <button
            onClick={remove}
        >Remove</button>
    )
}
