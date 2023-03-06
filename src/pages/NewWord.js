import { useEffect, useState } from 'react';
import Top from './components/Top';
import Form from './components/Form';
import '../styles/NewWord.css';

function NewWord({change_page_name, local_storage_add}) {
    let [edit_status, set_edit_status] = useState(false);
    let [unavailable_word, set_unavailable_word] = useState('');

    function get_form_data(event) {
        event.preventDefault();
        
        const form_data = new FormData(event.target);
        const data = Object.fromEntries(form_data.entries());

        for (let [item, value] of Object.entries(data)) {
            if (value === "") event.target[item].classList.add('empty');
        }
        
        set_unavailable_word('');

        if (data.name !== "" && data.translate !== "") {
            const check_available = local_storage_add(data);

            if (check_available) {
                event.target.reset();
                set_edit_status(true);
            } else {
                event.target['name'].classList.add('empty');
                set_unavailable_word('the word is already exists!');
            }
        }
    }

    useEffect(() => {
        if (edit_status) {
            const ease = setTimeout(() => {
                set_edit_status(false);
            }, 500);
            return () => clearTimeout(ease);
        }
    }, [edit_status]);

    return (
        <>
            <Top
                change_page_name={change_page_name}
                form="add_form"
                form_name_button="Add"
                edit_status={edit_status}
            />
            <div className='unavailable_word'>{unavailable_word}</div>
            <Form
                get_form_data={get_form_data}
                set_unavailable_word={set_unavailable_word}
            />
        </>
    )
}

export default NewWord;
