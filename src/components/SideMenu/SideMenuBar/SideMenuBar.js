import "./SideMenuBar.css";

function SideMenuBar({isActive,handleClick}) {
    return (
        <div>
            <div className={`overlay ${isActive ? 'show' : ''}`} onClick={handleClick}></div>
            <div className={`sidemenu__bar ${isActive ? 'show' : ''}`}>
            <h1 className="sidemenu__title">
                More Clean Water
            </h1>
            <ul className="sidemenu__maplabels">
                <li className="sidemenu__item station">
                <div className="map-labels__icon material-icons">room</div>
                <h5>Clean Water Station</h5>
                </li>
                <li className="sidemenu__item natural">
                <div className="map-labels__icon material-icons">room</div>
                <h5>Natural Water Source</h5>
                </li>
                <li className="sidemenu__item alerts">
                <div className="map-labels__icon material-icons">info</div>
                <h5>Alerts</h5>
                </li>
                <li className="sidemenu__item groundwater">
                <div className="map-labels__icon material-icons">waves</div>
                <h5>Groundwater</h5>
                </li>
            </ul>
            <ul className="sidemenu__main">
                <li className="sidemenu__item dashboard">
                <h5 className="title">
                    <a href="dashboard">Dashboard</a>
                </h5>
                </li>
                <li className="sidemenu__item profile">
                <h5 className="title">
                    <a href="profile">User profile</a>
                </h5>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default SideMenuBar