import './Navbar.scss';
import Dropdown from './Dropdown';
import Login from '../Login/Login';
import { useState } from 'react';


function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState('');

  const handleSetActive = (title) => {
      setActiveDropdown(title);
  };

    return (
      <nav className="navbar">
          <div className="nav-logo">
              <a href="#"><img src="src/components/Navbar/pawfectlogo.png" alt="PAWfect Match Logo" /></a>
          </div>
          <div className="page-links">
            <ul>
                <li>
                  <a href ="#" onClick={() => handleSetActive('Home')}> 
                    <Dropdown title="Home" items={['Quiz', 'Test']} />
                  </a>
                </li>
                <li>
                  <a href ="#" onClick={() => handleSetActive('About')}>  
                    <Dropdown title="About" items={['Trips', 'Hub']} />
                  </a>
                </li>
                <li>
                  <a href ="#" onClick={() => handleSetActive('About')}> 
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