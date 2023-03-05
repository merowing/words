import Top from './components/Top';
import Form from './components/Form';
import '../styles/NewWord.css';
import '../styles/EditWord.css';
import { useEffect, useState } from 'react';

function NewWord({change_page_name, local_storage_data, edit_word}) {

    let [edit_status, set_edit_status] = useState(false);
    const [word_index, word] = edit_word;

    function get_form_data(event) {
        event.preventDefault();
        
        const form = new FormData(event.target);
        const form_data = Object.fromEntries(form.entries());
        const id = local_storage_data[word_index].id;

        local_storage_data[word_index] = {id, ...form_data};
        localStorage.setItem("words", JSON.stringify(local_storage_data));

        set_edit_status(true);
    }

    useEffect(() => {
        if(edit_status) {
            const ease = setTimeout(() => {
                set_edit_status(false);
            }, 500);

            return () => {
                clearTimeout(ease);
            }
        }
    }, [edit_status]);

    return (
        <>
            <Top
                change_page_name={change_page_name}
                page_name="My words"
                form="add_form"
                form_name_button="Edit"
                edit_status={edit_status}
            />
            <Form
                get_form_data={get_form_data}
                edit_word={word}
            />
        </>
    )
}

export default NewWord;
