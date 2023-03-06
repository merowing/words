import '../styles/DailyWords.css';
import Words from './components/Words';
import Top from './components/Top';

function DailyWords({change_page_name, listen_button, set_listen_word}) {
    const json_string = localStorage.getItem("daily");
    const json = JSON.parse(json_string);
    json.active = false;
    localStorage.setItem("daily", JSON.stringify(json));

    const words = JSON.parse(localStorage.getItem("daily")).words;

    return (
        <>
            <Top
                change_page_name={change_page_name}
                listen_button={listen_button}
            />
            <Words
                set_listen_word={set_listen_word}
                words={words}
            />
        </>
    )
}

export default DailyWords;
