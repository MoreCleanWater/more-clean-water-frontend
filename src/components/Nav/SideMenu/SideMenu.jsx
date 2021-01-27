import {useState} from "react";
import SideMenuBar from "./SideMenuBar/SideMenuBar"
import "./SideMenu.css"
import MenuIcon from '@material-ui/icons/Menu';

function SideMenu () {
    const [isActive, toggleMenu] = useState(false);

    const handleClick = (e) => toggleMenu(isActive ? false : true);

    return (
        <div className="sidemenu">
            <div className="sidemenu__button material-icons" 
                onClick={handleClick}
            >
                <MenuIcon/>
            </div>
            <SideMenuBar isActive={isActive} onClick={handleClick}/>
        </div>
    )
}

export default SideMenu;