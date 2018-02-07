import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function MyAppBar(props) {
  const { isAuthenticated, name } = props.user
  const logout = props.logout
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Global Network
          </Typography>
          { isAuthenticated ?
            <Button
              color="inherit"
              onClick={logout}
            >Logout</Button> :
            <Button 
              color="inherit"
              onClick={() => alert('Existing user login not implemented!  Please sign up and create a new user below')}
            >Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(MyAppBar);
