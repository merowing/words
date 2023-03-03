import '../styles/DailyWords.css';
import Words from './components/Words';
import Top from './components/Top';

function DailyWords({change_page_name, words}) {
    const json_string = localStorage.getItem("daily");
    const json = JSON.parse(json_string);
    json.active = false;
    localStorage.setItem("daily", JSON.stringify(json));

    return (
        <>
            <Top change_page_name={change_page_name} />
            <Words words={words} />
        </>
    )
}

export default DailyWords;
