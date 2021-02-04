import {Link, NavLink, Redirect} from 'react-router-dom';
import {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import UpdatesList from '../../Updates/UpdatesList/UpdatesList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import UserId from '../../Form/UserId';
import "./TopMenu.scss"
import { AppBar, IconButton, Menu, MenuItem, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { MenuIcon } from '@material-ui/data-grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function TopMenu() {
    const [status, setStatus] = useState('idle');

    const [profileLink, setProfileLink] = useState('/signin');

    useEffect(() => {
        if (UserId.value) {
            setStatus('login');
            setProfileLink('/profile');
        }  else {
            setProfileLink('/signin');
        }
    }, [])

    const [isUpdateActive, toggleUpdate] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = e => toggleUpdate(isUpdateActive ? false : true);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') return;
        setStatus('idle');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = (e) => {
        UserId.value = '';
        setStatus('logout');
        setProfileLink('/signin');
    }

    if (status === 'logout') return <Redirect to="/signin"/>
    
    return (
        <div>
            <Snackbar 
                open={status==='login'}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
                onClose={handleCloseSnackBar}
            >
                <Alert onClose={handleCloseSnackBar} severity="success" >
                    User logged in successfully
                </Alert>
            </Snackbar>
            
            <div className="appBarContainer">
                
                    <AppBar position="static" className='appBar'>
                        <h4>
                            More Clean Water
                        </h4>

                        <Toolbar className="toolBar">
                            {/* <IconButton edge="start" aria-label="menu">
                                <MenuIcon />
                            </IconButton> */}

                            <IconButton 
                                aria-controls="profile-menu" 
                                aria-haspopup="true" 
                                component="span"
                                className='profileMenu'
                                onClick={e => setAnchorEl(e.currentTarget)}
                            >
                                <MoreVertIcon className='profileIcon'/>
                            </IconButton>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                PaperProps={{style: {width: '12ch'}}}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                <MenuItem onClick={handleClose} component={Link} to={profileLink}>{UserId.value ? 'Profile' : 'Sign In'}</MenuItem>
                                {UserId.value ? 
                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                    : ''
                                }
                                
                            </Menu>
                        </Toolbar>
                    </AppBar>
                
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
                            <IconButton 
                                aria-controls="profile-menu" 
                                aria-haspopup="true" 
                                component="span"
                                style={{padding: 0}}
                                onClick={e => setAnchorEl(e.currentTarget)}
                            >
                                <AccountCircleIcon className='profileIcon'/>
                            </IconButton>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                PaperProps={{style: {width: '12ch'}}}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                <MenuItem onClick={handleClose} component={Link} to={profileLink}>{UserId.value ? 'Profile' : 'Sign In'}</MenuItem>
                                {UserId.value ? 
                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                    : ''
                                }
                                
                            </Menu>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default TopMenu;