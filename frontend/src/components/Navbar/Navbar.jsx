import './Navbar.scss';
import Dropdown from './Dropdown';
import Login from '../../components/Login/Login';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [click, setClick] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const onMouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHoveredCategory(null);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src="src/components/Navbar/pawfectlogo.png" alt="PAWfect Match Logo" />
      </Link>

      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>

      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        {['home', 'about', 'adapt'].map((category) => (
          <li
            key={category}
            className="nav-item"
            onMouseEnter={() => onMouseEnter(category)}
            onMouseLeave={onMouseLeave}
          >
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
            {hoveredCategory === category && <Dropdown category={category} />}
          </li>
        ))}
      </ul>
      <Login />
    </nav>
  );
}

export default Navbar;
