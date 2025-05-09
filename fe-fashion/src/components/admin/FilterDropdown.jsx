// src/components/common/FilterDropdown.jsx
import React from 'react';
import { FaFilter } from 'react-icons/fa';
import '../../assets/styles/FilterDropdown.scss';

const FilterDropdown = ({ value, onChange, options }) => {
  return (
    <div className="filter-dropdown">
      <FaFilter />
      <select value={value} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
