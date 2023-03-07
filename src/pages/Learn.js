import { useState } from 'react';
import Words from './components/Words';
import Top from './components/Top';

function Learn({words, change_page_name}) {

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
                page_name="My words"
                listen_button={listen_button}
            />
            <Words
                words={words}
                set_listen_word={set_listen_word}
                justifyContent='center'
            />
        </>
    );
}

export default Learn;
