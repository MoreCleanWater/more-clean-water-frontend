import Grid from '@material-ui/core/Grid';
import UpdatesList from '../Updates/UpdatesList/UpdatesList';
import "./TopMenu.css"

function TopMenu() {
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
                        <a href="find-water">Find Water</a>
                        </li>
                        <li className="top-menu__item water-awareness">
                        <a href="water-awareness">Water Awareness</a>
                        </li>
                        <li className="top-menu__item dashboard">
                        <a href="dashboard">Dashboard</a>
                        </li>
                    </ul>
                </Grid>
                <Grid item md={1}>
                    <ul className="top-menu__icons">
                        <li className="top-menu__updates">
                            <div className="material-icons">
                                notifications
                            </div>
                            <div id="updates-overlay" class="updates-container overlay">
                                <UpdatesList/>
                            </div>
                        </li>
                        <li className="top-menu__user material-icons">
                            <a href="profile">account_circle</a>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    )
}

export default TopMenu;