import Close from './buttons/Close';
import RefreshButton from './buttons/Refresh';

function Top({change_page_name, refresh}) {
    


    return (
        <div className="top">
            <div className="left_buttons">
                {
                    (refresh)
                        ? <RefreshButton refresh={refresh} />
                        : <></>
                }
            </div>
            <Close change_page_name={change_page_name} />
        </div>
    )
}

export default Top;
