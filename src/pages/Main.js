import { useState } from 'react';
import NewWord from './NewWord';

function Main() {
    const names = ['Today\'s words', 'New word', 'All words', 'Random words'];
    const [total_words, set_total_words] = useState(0);
    const [local_storage_size, set_local_storage_size] = useState('100%');

    function local_storage_get_size() {
        var _lsTotal = 0,
        _xLen, _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = ((localStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
            console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
        };
        return (_lsTotal / 1024).toFixed(2) + " KB";
    }

    console.log(local_storage_get_size());
    //set_local_storage_size('1');

    return (
        <div className="main">
            <nav>
                <ul>
                    {
                        names.map((item, i) => {
                            return <li key={`${item}-${i}`}>{item}</li>;
                        })
                    }
                </ul>
            </nav>
            <footer>
                    <div>Available words: {total_words}</div>
                    <div>LocalStorage free space: {local_storage_size}</div>
            </footer>
        </div>
    )
}

export default Main;
