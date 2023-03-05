const names = ['Daily words', 'Learn words', 'New word', 'My words'];

function daily_status(words_len) {
    const json_string = localStorage.getItem("daily");
    if (json_string) {
        const {active} = JSON.parse(json_string);

        return (active && words_len)
            ? ''
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
                            let class_string = (i === 0)
                                ? daily_status(words_len)
                                : '';

                            return (
                                <li key={`li-${name}-${i}`}>
                                    <button
                                        key={`button-${name}-${i}`}
                                        type="button"
                                        onClick={
                                            (class_string === '')
                                                ? (event) => {
                                                    event.stopPropagation();
                                                    change_page_name(name);
                                                }
                                                : null
                                        }
                                        className={class_string}
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
