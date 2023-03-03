import '../DailyWords.css';
import WordsPage from './WordsPage';
import Close from './Close';

function DailyWords({change_page_name, words}) {
    const json_string = localStorage.getItem("daily");
    const json = JSON.parse(json_string);
    json.active = false;
    localStorage.setItem("daily", JSON.stringify(json));

    return (
        <>
            <Close change_page_name={change_page_name} />
            <WordsPage words={words} />
        </>
    )
}

export default DailyWords;
