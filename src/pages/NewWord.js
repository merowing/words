import Close from './Close.js';
import '../NewWord.css';

function NewWord({change_page_name, local_storage_add}) {

    function get_form_data(event) {
        event.preventDefault();
        
        const form_data = new FormData(event.target);
        const data = Object.fromEntries(form_data.entries());

        for(let [item, value] of Object.entries(data)) {
            if(value === "") event.target[item].classList.add('empty');
        }
        
        if(data.name !== "" && data.translate !== "") {
            event.target.reset();
            local_storage_add(data);
        }
    }

    function clear_form(event) {
        event.target.classList.remove('empty');
    }

    return (
        <>
            <Close change_page_name={change_page_name} />   
            <form onSubmit={(event) => get_form_data(event)} onClick={(event) => clear_form(event)}>
                <input type='text' name='name' placeholder='Word' />
                <input type='text' name='translate' placeholder='Translate' />
                <textarea name='sentence' placeholder='Example sentence'></textarea>
                <div className='buttons'>
                    <button className='add_button'>Add</button>
                </div>
            </form>
        </>
    )
}

export default NewWord;
