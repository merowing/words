import Remove from './buttons/Remove';

function Control({remove}) {
    return (
        <ul className="control">
            <li>
                <Remove remove={remove} />
            </li>
        </ul>
    )
}

export default Control;
