import { useEffect, useState } from 'react';
import Words from './components/Words';
import Top from './components/Top';

function random(ids) {
    const indexes = [];
    const max = (ids.length > 10)
        ? 10
        : ids.length;

    for (let i = 0; i < max; i++) {
        const rand = Math.round(Math.random() * (ids.length - 1));
        indexes.push(...ids.splice(rand, 1));
    }
    
    return indexes;
}

function random_words() {
    let words = [];
    const json_string = localStorage.getItem("words");
    if (json_string) {
        const json = JSON.parse(json_string);
        const ids = json.map((item, index) => index);
        
        words = random(ids).map(num => json[num]);
    }
    return words;
}

function LearnWords({change_page_name}) {
    let [words, set_words] = useState([]);

    function refresh_button() {
        set_words(random_words());
    }

    useEffect(() => {
        set_words(random_words());
    }, []);

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
                refresh_button={
                    (event) => {
                        event.stopPropagation();
                        refresh_button();
                    }
                }
                listen_button={listen_button}
                change_page_name={change_page_name}
            />
            {
                (words.length)
                    ? <Words
                        words={words}
                        set_listen_word={set_listen_word}
                    />
                    : <div className='empty'><span>Empty</span></div>
            }
        </>
    );
}

export default LearnWords;
