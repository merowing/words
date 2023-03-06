const names = ['Learn words', 'New word', 'My words', 'Daily words'];

function daily_status(words_len) {
    const json_string = localStorage.getItem("daily");
    if (json_string) {
        const {active} = JSON.parse(json_string);

        return (active && words_len)
            ? 'daily'
            : 'disable';
    }

    return '';
}

function Menu({change_page_name, words_len}) {
    return (
        <>
            <nav>
                <ul>
                    {
                        names.map((name, i) => {
                            let class_string = (name === 'Daily words')
                                ? daily_status(words_len)
                                : '';

                            return (
                                <li
                                    key={`li-${name}-${i}`}
                                    className={class_string}
                                >
                                    <button
                                        key={`button-${name}-${i}`}
                                        type="button"
                                        onClick={
                                            (class_string !== 'disable')
                                                ? (event) => {
                                                    event.stopPropagation();
                                                    change_page_name(name);
                                                }
                                                : null
                                        }
                                    >{name}</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        </>
    )
}

export default Menu;
