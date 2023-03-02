const names = ['Today\'s words', 'New word', 'My words', 'Random words'];

function Menu({change_page_name}) {
    return (
        <>
            <nav>
                <ul>
                    {
                        names.map((name, i) => {
                            return (
                                <li key={`li-${name}-${i}`}>
                                    <button
                                        key={`button-${name}-${i}`}
                                        onClick={() => change_page_name(name)}
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
