import Top from './components/Top';
import Form from './components/Form';
import '../styles/NewWord.css';
import '../styles/EditWord.css';
import { useEffect, useState } from 'react';

function EditWord({change_page_name, local_storage_data, edit_word}) {

    let [edit_status, set_edit_status] = useState(false);
    let [unavailable_word_message, set_unavailable_word_message] = useState('');
    const [word_index, word] = edit_word;

    function get_form_data(event) {
        event.preventDefault();
        
        const form = new FormData(event.target);
        const form_data = Object.fromEntries(form.entries());
        const id = local_storage_data[word_index].id;

        const is_available = local_storage_data.some((word) => {
            return (
                word.name.toLowerCase() === form_data['name'].toLocaleLowerCase()
                && id !== word.id
            )
        });

        set_unavailable_word_message('');
        event.target['name'].classList.remove('empty');
        if (!is_available) {
            local_storage_data[word_index] = {id, ...form_data};
            localStorage.setItem("words", JSON.stringify(local_storage_data));

            set_edit_status(true);
        } else {
            event.target['name'].classList.add('empty');
            set_unavailable_word_message('the word already exists!');
        }
    }

    useEffect(() => {
        if (edit_status) {
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
            <div className='unavailable_word_message'>{unavailable_word_message}</div>
            <Form
                get_form_data={get_form_data}
                set_unavailable_word_message={set_unavailable_word_message}
                edit_word={word}
            />
        </>
    )
}

export default EditWord;
