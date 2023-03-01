const names = ['Today\'s words', 'New word', 'All words', 'Random words'];

function Menu({total_words, local_storage_size, set_page_index}) {
    return (
        <>
            <nav>
                <ul>
                    {
                        names.map((item, i) => {
                            return (
                                <li key={`li-${item}-${i}`}>
                                    <button
                                        key={`button-${item}-${i}`}
                                        onClick={() => set_page_index(i + 1)}
                                    >{item}</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
            <footer>
                    <div>Available words: {total_words}</div>
                    <div>LocalStorage free space: {local_storage_size}</div>
            </footer>
        </>
    )
}

export default Menu;
