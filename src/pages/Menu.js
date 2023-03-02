const names = ['Daily words', 'New word', 'My words', 'Random words'];

function daily_status() {
    const json_string = localStorage.getItem("daily");
    if(json_string) {
        const {active} = JSON.parse(json_string);

        return (active)
            ? ''
            : 'disable';
    }

    return '';
}

function Menu({change_page_name}) {
    return (
        <>
            <nav>
                <ul>
                    {
                        names.map((name, i) => {
                            let class_string = (i === 0)
                                ? daily_status()
                                : '';

                            return (
                                <li key={`li-${name}-${i}`}>
                                    <button
                                        key={`button-${name}-${i}`}
                                        onClick={
                                            (class_string === '')
                                                ? () => change_page_name(name)
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
