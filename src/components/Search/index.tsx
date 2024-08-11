import React from 'react';
import { useState } from 'react';

interface Props {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

function Search(props: Props) {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');

  return (
    <form className="search container">
      <input
        value={search}
        className="search__input"
        onChange={(event) => setSearch(event.currentTarget.value)}
      ></input>
      <button
        onClick={(event) => {
          event.preventDefault();
          props.setSearchWord(search);
          localStorage.setItem('search', search);
        }}
        className="search__button"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
