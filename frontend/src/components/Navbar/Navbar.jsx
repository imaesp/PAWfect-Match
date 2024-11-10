import './Navbar.scss';
import Dropdown from './Dropdown';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState('');

  const handleSetActive = (title) => {
      setActiveDropdown(title);
  };

    return (
      <nav className="navbar">
          <div className="nav-logo">
              <Link to="/"><img src="src/components/Navbar/pawfectlogo.png" alt="PAWfect Match Logo" /></Link>
          </div>
          <div className="page-links">
            <ul>
                <li>
                  <Link to="/survey" onClick={() => handleSetActive('Home')}> 
                    <Dropdown title="Home" items={['Survey', 'Test']} />
                  </Link>
                </li>
                <li>
                  <a onClick={() => handleSetActive('About')}>  
                    <Dropdown title="About" items={['Trips', 'Hub']} />
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSetActive('About')}> 
                    <Dropdown title="Contact" items={['Insta', 'Facebook']} />
                  </a>
                </li>
            </ul>
        </div>
        <Login className="login_btn"></Login>
      </nav>
    );
}
export default Navbar;