import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink, Redirect  } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import css from "styles/Admin.module.scss";
import { useState } from 'react';
import { auth } from "database/firebase";

function AdminNav() {
  const [isOpen, setOpen] = React.useState(false);

  const [status, setStatus] = useState('idle');

  const toggleDrawer = (isOpen) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const handleLogOut = (e) => {
    localStorage.removeItem('adminId');
    auth.signOut();
    setStatus('logout');
}

if (status === 'logout') return <Redirect to="/admin"/>

  return (
    <React.Fragment key='left'>
        
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            className="absolute"
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
            <div
                className={css.menuList}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem button component={NavLink} to="/admin/users">
                        <ListItemText primary="Users"/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/water-stations">
                        <ListItemText primary="Water Stations"/>
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Awareness"/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/awareness-category">
                        <ListItemText primary="Categories" className={css.menuItem__nested}/>
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/awareness-content">
                        <ListItemText primary="Content" className={css.menuItem__nested}/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/events">
                        <ListItemText primary="Events"/>
                    </ListItem>

                <Divider />
                    <ListItem button onClick={handleLogOut}>
                        <ListItemText primary="Logout"/>
                    </ListItem>
{/* 
                    <ListItem button onClick={handleLogOut}>
                        <ListItemText primary="Logout"/>
                    </ListItem> */}
                </List>
            </div>
        </SwipeableDrawer>
    </React.Fragment>
    
  );
}

export default AdminNav;