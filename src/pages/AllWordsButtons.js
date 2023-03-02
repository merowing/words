function Control({remove}) {
    return (
        <ul className="control">
            <li>Learn</li>
            <li onClick={remove}>Remove</li>
        </ul>
    )
}

export default Control;
