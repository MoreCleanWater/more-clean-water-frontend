import {Link, NavLink, Redirect} from 'react-router-dom';
import {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import UpdatesList from '../../Updates/UpdatesList/UpdatesList';
import NotificationsIcon from '@material-ui/icons/Notifications';
import "./TopMenu.scss"
import { AppBar, IconButton, Menu, MenuItem, Snackbar, Toolbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EjectIcon from '@material-ui/icons/Eject';

function TopMenu() {
    const [status, setStatus] = useState('idle');

    const [profileLink, setProfileLink] = useState('/signin');

    const [userId] = useState(localStorage.getItem('userId'));
    
    useEffect(() => {
        console.log(userId)
        if (userId) {
            setStatus('login');
            setProfileLink('/profile');
        }  else {
            setProfileLink('/signin');
        }
    }, [userId])
    
    const [isUpdateActive, toggleUpdate] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null)

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') return;
        setStatus('idle');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = (e) => {
        localStorage.removeItem('userId');
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
                        <h1>
                            More Clean Water
                        </h1>

                        <Toolbar className="toolBar">
                            {/* <IconButton edge="start" aria-label="menu">
                                <MenuIcon />
                            </IconButton> */}

                            <Grid container md={8} className='desktopOnly'>   
                                <ul>
                                    <li>
                                        <NavLink to="/find-water">
                                            Find Water
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/awareness">
                                        Awareness
                                    </NavLink>
                                    </li>
                                </ul>
                                <div className="notificationsArea">
                                    <IconButton 
                                        aria-controls="notifications-list" 
                                        aria-haspopup="true" 
                                        component="div"
                                        className="notificationsMenu"
                                        onClick={e => toggleUpdate(isUpdateActive ? false : true)}
                                    >
                                        <NotificationsIcon/>
                                    </IconButton>

                                    <div 
                                        className={`updates-container overlay ${isUpdateActive ? 'active' : ''}`}
                                    >
                                        <div className="arrow" onClick={e => toggleUpdate(isUpdateActive ? false : true)}>
                                            <EjectIcon/>
                                        </div>
                                        <UpdatesList/>
                                    </div>
                                </div>
                            </Grid>
                            
                            
                            <IconButton 
                                aria-controls="profile-menu" 
                                aria-haspopup="true" 
                                component="div"
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
                                <MenuItem onClick={handleClose} component={Link} to={profileLink}>{userId ? 'Profile' : 'Sign In'}</MenuItem>
                                {userId ? 
                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                    : ''
                                }
                                
                            </Menu>
                        </Toolbar>
                    </AppBar>
                
            </div>
            
        </div>
    )
}

export default TopMenu;