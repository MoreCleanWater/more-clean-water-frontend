import "./SideMenuBar.css";

function SideMenuBar({isVisible,handleClick}) {
    console.log(isVisible)
    return (
        <div>
            <div className={`overlay ${isVisible ? 'show' : ''}`} onClick={handleClick}></div>
            <div className={`sidemenu__bar ${isVisible ? 'show' : ''}`}>
            <h1 className="sidemenu__title">
                More Clean Water
            </h1>
            <ul id="sidemenu__maplabels" className="sidemenu__maplabels">
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
            <ul id="sidemenu__main" className="sidemenu__main">
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