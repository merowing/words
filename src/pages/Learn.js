import Words from './components/Words';
import Top from './components/Top';

function Learn({words, change_page_name, listen_button, set_listen_word}) {
    return (
        <>
            <Top
                change_page_name={change_page_name}
                page_name="My words"
                listen_button={listen_button}
            />
            <Words
                words={words}
                set_listen_word={set_listen_word}
            />
        </>
    );
}

export default Learn;
