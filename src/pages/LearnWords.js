import Words from './components/Words';
import Top from './components/Top';

function LearnWords({words, change_page_name}) {
    return (
        <>
            <Top
                change_page_name={change_page_name}
                page_name="My words"
            />
            <Words words={words} />
        </>
    );
}

export default LearnWords;
