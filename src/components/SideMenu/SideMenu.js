import {useState} from "react";
import SideMenuBar from "./SideMenuBar/SideMenuBar"
import "./SideMenu.css"

function SideMenu () {
    const [isVisible, setVisible] = useState(false);

    const handleClick = (e) => {
        setVisible(isVisible ? false : true)
    }

    return (
        <div className="sidemenu">
            <div id="sidemenu__button" 
                className="sidemenu__button material-icons" 
                target-element="sidemenu__bar"
                onClick={handleClick}
            >
                menu
            </div>
            <SideMenuBar isVisible={isVisible} handleClick={handleClick}/>
        </div>
    )
}

export default SideMenu;