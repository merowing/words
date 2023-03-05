import { useEffect, useState } from 'react';
import Top from './components/Top';
import Form from './components/Form';
import '../styles/NewWord.css';

function NewWord({change_page_name, local_storage_add}) {
    let [edit_status, set_edit_status] = useState(false);

    function get_form_data(event) {
        event.preventDefault();
        
        const form_data = new FormData(event.target);
        const data = Object.fromEntries(form_data.entries());

        for (let [item, value] of Object.entries(data)) {
            if(value === "") event.target[item].classList.add('empty');
        }
        
        if (data.name !== "" && data.translate !== "") {
            event.target.reset();
            set_edit_status(true);
            local_storage_add(data);
        }
    }

    useEffect(() => {
        if(edit_status) {
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
            <Form
                get_form_data={get_form_data}
            />
        </>
    )
}

export default NewWord;
