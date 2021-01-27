import {NavLink} from 'react-router-dom';
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import UpdatesList from '../../Updates/UpdatesList/UpdatesList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import "./TopMenu.scss"

function TopMenu() {
    const [isUpdateActive, toggleUpdate] = useState(false);

    const handleClick = (e) => toggleUpdate(isUpdateActive ? false : true);

    return (
        <div>
            <div className="profileMenuMobile">
                <NavLink to="/profile">
                    <AccountCircleIcon className="profileIcon" />
                </NavLink>
            </div>
            <div className="top-menu">
                <Grid container justify="space-around">
                    <Grid item md={3}>
                        <h1 className="top-menu__title">
                            More Clean Water
                        </h1>
                    </Grid>
                    <Grid item md={8}>
                        <ul className="top-menu__menu">
                            <li className="top-menu__item find-water">
                            <NavLink to="/find-water">
                                Find Water
                            </NavLink>
                            </li>
                            <li className="top-menu__item water-awareness">
                            <NavLink to="/awareness">
                                Awareness
                            </NavLink>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item md={1}>
                        <ul className="top-menu__icons">
                            <li className="top-menu__updates">
                                <div className="material-icons" onClick={handleClick}>
                                    <NotificationsIcon />
                                </div>
                                <div className={`updates-container overlay ${isUpdateActive ? 'active' : ''}`}>
                                    <UpdatesList/>
                                </div>
                            </li>
                            <li className="top-menu__user">
                                <NavLink to="/profile">
                                    <AccountCircleIcon />
                                </NavLink>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default TopMenu;