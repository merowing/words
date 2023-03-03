function Close({change_page_name, page_name = "Menu"}) {
    return (
        <button
            className="close_button"
            onClick={
                () => change_page_name(page_name)
            }
        >Back</button>
    )
}

export default Close;
