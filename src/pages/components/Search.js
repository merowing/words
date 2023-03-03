function Search({search_word}) {
    return (
        <div className='search'>
            <input type='text' placeholder='Search' onChange={(event) => search_word(event)} />
        </div>
    )
}

export default Search;
