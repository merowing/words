function Learn({change_page_name, learn_words, chose_words}) {
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

export default Learn;
