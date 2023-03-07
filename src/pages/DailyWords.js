import '../styles/DailyWords.css';
import Words from './components/Words';
import Top from './components/Top';
import { useState } from 'react';

const words = JSON.parse(localStorage.getItem("daily")).words;

function DailyWords({change_page_name}) {
    const json_string = localStorage.getItem("daily");
    const json = JSON.parse(json_string);
    json.active = false;
    localStorage.setItem("daily", JSON.stringify(json));

    const [listen_word, set_listen_word] = useState('');
    function listen_button() {
        const synth = window.speechSynthesis;
        if (synth.speaking) {
            synth.cancel();
        }
    
        if (listen_word) {
            const msg = new SpeechSynthesisUtterance(listen_word);
            synth.speak(msg);
        }
    }

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
