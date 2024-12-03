import './Filter.scss'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FilterMenu } from './FilterMenu';
import { useState } from 'react'

function Filter() {
  const [selectedFilters, setSelectedFilters] = useState({
    species: '',
    breed: '',
    size: '',
    color: '',
    age: ''
  });
  
   // Handle selection change for each filter
   const handleSelect = (type, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [type]: value
    });
  };

  return (
      <div className="filter-menu">
      {/* Render Dropdowns dynamically */}
      {Object.keys(FilterMenu).map((filterKey) => (
        <DropdownButton
          key={filterKey}
          id={`dropdown-${filterKey}`}
          title={filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
          variant="secondary"
          className="filter-dropdown"
        >
          {FilterMenu[filterKey].map((option) => (
            <Dropdown.Item
              key={option}
              onSelect={() => handleSelect(filterKey, option)}
              active={selectedFilters[filterKey] === option}  // Highlight selected option
            >
              {option}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ))}
    </div>
  );
}

export default Filter;
