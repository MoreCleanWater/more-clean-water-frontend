import {NavLink} from "react-router-dom";
import './BottomMenuItem.css';

function BottomMenuItem({icon, title, to}) {
  return (
    <NavLink to={to}>
      <li className='bottom-menu-item'>
          <div className="bottom-menu-item__icon material-icons">
              {icon}
          </div>
          <div className="bottom-menu-item__title">
              {title}
          </div>
      </li>
    </NavLink>
  );
}

export default BottomMenuItem;
