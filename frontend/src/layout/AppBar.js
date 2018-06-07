import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link }  from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default class AppBarComponent extends React.Component {
  state = {
    anchorEl: null,
    drawer_open: false
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer(){
      this.setState({'drawer_open': !this.state.drawer_open});
  }

  render() {
    const classes = this.props;
    const { anchorEl } = this.state;
    const auth = this.props.auth;
    const open = Boolean(anchorEl);

    if(auth){
      return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                  onClick={this.toggleDrawer.bind(this)}
                >
                  <MenuIcon  />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer open={this.state.drawer_open} onClose={e=>this.setState({'drawer_open':false})}>
            <List component="nav">
                <Link to="/">
                  <ListItem button><ListItemText primary="Login" /></ListItem>
                </Link>
                <Link to="/addalert">
                  <ListItem button><ListItemText primary="Add Alert" /></ListItem>
                </Link>
                <Link to="/myalerts">
                  <ListItem button><ListItemText primary="My Alerts" /></ListItem>
                </Link>
            </List>
            </Drawer>
        </div>
      );
    }else {
      return('');
    }

  }
}
