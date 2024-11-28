import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useSearch } from "../../store/SearchContext.tsx";
import debounce from 'lodash/debounce';
import "./SearchBar.scss";

const SearchBar = () => {
  const { setSearchQuery, setPagination } = useSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const onClickClear = () => {
    setSearchQuery('');
    setInputValue('');
    inputRef.current?.focus();
  };

  const debounceDispatch = useCallback(
      debounce((query: string) => {
        setPagination(prevState => ({...prevState, currentPage: 1}))
        setSearchQuery(query);
      }, 250), []
  );

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounceDispatch(e.target.value);
  };

  return (
      <div className="search-bar">
        <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleSearchQueryChange}
            placeholder="Search heroes..."
            className="search-bar__input"
        />
        {inputValue &&
          <svg className="search-bar__clear-icon" onClick={onClickClear} height="512px" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg">
            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
          </svg>}
      </div>
  );
};

export default SearchBar;
