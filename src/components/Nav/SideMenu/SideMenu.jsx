import {useState} from "react";
import SideMenuBar from "./SideMenuBar/SideMenuBar"
import "./SideMenu.css"

function SideMenu () {
    const [isActive, toggleMenu] = useState(false);

    const handleClick = (e) => toggleMenu(isActive ? false : true);

    return (
        <div className="sidemenu">
            <div className="sidemenu__button material-icons" 
                onClick={handleClick}
            >
                menu
            </div>
            <SideMenuBar isActive={isActive} onClick={handleClick}/>
        </div>
    )
}

export default SideMenu;