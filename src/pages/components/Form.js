import { useEffect, useState } from "react";

function Form({get_form_data, edit_word, set_unavailable_word_message}) {

    let [form_name, set_form_name] = useState('');
    let [form_translate, set_form_translate] = useState('');
    let [form_sentence, set_form_sentence] = useState('');

    useEffect(() => {
        if (edit_word && Object.keys(edit_word).length) {
            const {name, translate, sentence} = edit_word;
            
            set_form_name(name);
            set_form_translate(translate);
            set_form_sentence(sentence);
        }
    }, [edit_word]);

    function change_name(event) {
        set_form_name(event.target.value);
    }

    function change_translate(event) {
        set_form_translate(event.target.value);
    }

    function change_sentence(event) {
        set_form_sentence(event.target.value);
    }

    function clear_form(event) {
        event.target.classList.remove('empty');
        set_unavailable_word_message('');
    }

    return (
        <form id='add_form' onSubmit={get_form_data} onClick={clear_form}>
            <div className="inner_inputs">
                <input type='text' name='name' placeholder='Word' defaultValue={(edit_word) ? form_name : ''} onChange={change_name} />
                <input type='text' name='translate' placeholder='Translation' defaultValue={(edit_word) ? form_translate : ''} onChange={change_translate} />
            </div>
            <textarea name='sentence' placeholder='Example sentence' defaultValue={(edit_word) ? form_sentence : ''} onChange={change_sentence}></textarea>
        </form>
    )
}

export default Form;
