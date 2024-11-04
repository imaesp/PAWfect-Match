
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