import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink  } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

function AdminNav() {
  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

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
                className="menu-list"
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem button component={NavLink} to="/admin/users">
                        <ListItemText primary="Users"/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/water-stations">
                        <ListItemText primary="Water Station"/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/awareness">
                        <ListItemText primary="Awareness"/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/awareness-category">
                        <ListItemText primary="Categories" className="menu-item__nested"/>
                    </ListItem>

                    <ListItem button component={NavLink} to="/admin/communication">
                        <ListItemText primary="Communication"/>
                    </ListItem>
                <Divider />
                </List>
            </div>
        </SwipeableDrawer>
    </React.Fragment>
    
  );
}

export default AdminNav;