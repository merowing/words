function Close({change_page_name}) {
    return (
        <button
            className="close_button"
            onClick={
                () => change_page_name("Menu")
            }
        >x</button>
    )
}

export default Close;