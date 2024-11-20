import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';

function Dropdown({ category }) {
  const filteredItems = MenuItems.filter(item => item.category === category);

  return filteredItems.length > 0 ? (
    <ul className={`dropdown-menu ${category}`}>
      <div className='menu-category'>
        {filteredItems.map(item => (
          <li key={item.id}>
            <Link className={item.cName} to={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </div>
    </ul>
  ) : null;
}

export default Dropdown;
