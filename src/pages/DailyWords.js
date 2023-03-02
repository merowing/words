import Close from './Close';
import '../DailyWords.css';

function DailyWords({change_page_name}) {
    return (
        <>
            <Close change_page_name={change_page_name}/>
            <div className='daily_block'>
                <div className='daily_word'>
                    <span className='word'>Word</span>
                    <span className='example'>Example</span>
                </div>
                <ul>
                    <li>
                        <button>Previous</button>
                    </li>
                    <li>1 / 10</li>
                    <li>
                        <button>Next</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DailyWords;
