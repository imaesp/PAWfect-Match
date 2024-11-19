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