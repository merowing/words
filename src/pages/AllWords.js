import Close from './Close';
import '../AllWords.css';

function AllWords({words, change_page_name}) {

    return (
        <>
            <Close change_page_name={change_page_name} />
            <div className='words'>
                {
                    words.map((word, i) => {
                        return (
                            <span key={`${word}-${i}`}>{word.name}</span>
                        );
                    })
                }
            </div>
        </>
    )
}

export default AllWords;
