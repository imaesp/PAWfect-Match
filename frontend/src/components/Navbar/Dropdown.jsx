<<<<<<< Updated upstream

import './Dropdown.scss';
import { useState } from 'react';

function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false); //current state is not open until we setIsOpen

    const handleHover = (isHovering) => {
        setIsOpen(isHovering);
    }
 

    return (
        <li 
            className="dropdown" 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
        >
        <span className={`dropdown-title ${props.active ? 'active' : ''}`}>
            {props.title}
        </span> 
        {isOpen && ( 
            <ul className="dropdown-list">
                {props.items.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
        )}
    </li>
    );
}
  
export default Dropdown
=======
import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';

function Dropdown({ category }) {
    return (
      <ul className="dropdown-menu">
        <div className={`menu-category ${category}`}>
          {MenuItems.filter(item => item.category === category).map((item, index) => (
            <>
             <li key={index}>
              <Link className={item.cName} to={item.path}>
                {item.title}
              </Link>
            </li> 

            </>
          ))}
        </div>
      </ul>
    );
}
  
export default Dropdown;
>>>>>>> Stashed changes
