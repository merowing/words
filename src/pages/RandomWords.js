import { useCallback, useEffect, useState } from 'react';
import Words from './components/Words';
import Top from './components/Top';

function RandomWords({change_page_name}) {
    let [words, set_words] = useState([{}]);

    let random = useCallback((ids) => {
        const indexes = [];
        const max = (ids.length > 10)
            ? 10
            : ids.length;

        for (let i = 0; i < max; i++) {
            const rand = Math.round(Math.random() * (ids.length - 1));
            indexes.push(...ids.splice(rand, 1));
        }
        
        return indexes;
    }, []);

    let random_words = useCallback(() => {
        let words = [];
        const json_string = localStorage.getItem("words");
        if (json_string) {
            const json = JSON.parse(json_string);
            const ids = json.map((item, index) => index);
            
            words = random(ids).map(num => json[num]);
        }
        return words;
    }, [random]);

    let refresh_button = useCallback(() => {
        set_words(random_words());
    }, [random_words]);

    useEffect(() => {
        set_words(random_words());
    }, []);

    return (
        <>
            <Top
                refresh_button={
                    (event) => {
                        event.stopPropagation();
                        refresh_button();
                    }
                }
                change_page_name={change_page_name}
            />
            {
                (words.length)
                    ? <Words words={words} />
                    : <div className='empty'><span>Empty</span></div>
            }
        </>
    );
}

export default RandomWords;
