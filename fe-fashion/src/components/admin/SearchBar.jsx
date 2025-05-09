import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../assets/styles/SearchBar.scss';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar">
      <span className="search-icon">
        <FaSearch />
      </span>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
