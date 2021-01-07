import {NavLink} from 'react-router-dom';
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import UpdatesList from '../../Updates/UpdatesList/UpdatesList';
import "./TopMenu.css"

function TopMenu() {
    const [isUpdateActive, toggleUpdate] = useState(false);

    const handleClick = (e) => toggleUpdate(isUpdateActive ? false : true);

    return (
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
                        <NavLink to="/water-awareness">
                            Water Awareness
                        </NavLink>
                        </li>
                        <li className="top-menu__item dashboard">
                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>
                        </li>
                    </ul>
                </Grid>
                <Grid item md={1}>
                    <ul className="top-menu__icons">
                        <li className="top-menu__updates">
                            <div className="material-icons" onClick={handleClick}>
                                notifications
                            </div>
                            <div className={`updates-container overlay ${isUpdateActive ? 'active' : ''}`}>
                                <UpdatesList/>
                            </div>
                        </li>
                        <li className="top-menu__user material- icons">
                        <NavLink to="/profile">
                            account_circle
                        </NavLink>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    )
}

export default TopMenu;