import './Navbar.scss';
import Dropdown from './Dropdown';
import Login from '../../components/Login/Login';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import leftpaw from '/Users/saniapervez/Desktop/Pawfect Match/PAWfect-Match/frontend/src/assets/leftpaw.png';

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
       <div className="container text-center">
        <div className="row justify-content-between align-items-center">
          
          <div className="col-auto">  
            <img src= {leftpaw} alt="PAWfect Match logo" style={{ height: '50px', width: 'auto' }}/>
          </div>
          <div className="col-auto">
            <Link to="/" className="nav-link"> PAWfect Match </Link>
          </div>

          <div className='col-auto mid'>  
            <div className="d-flex justify-content-end">
              <Link to="/article" className="navLinks">Pet EDU</Link>
              <Link to="/budget" className="navLinks">Budgeting Tool</Link>
              <Link to="/adopt" className="navLinks">Adopt</Link>
              <Link to="/survey" className="navLinks">Matchmaker</Link>
              <Link to="/about" className="navLinks">About</Link>
            </div>
          </div>

          <div className="col-auto login">
            <Login />
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;