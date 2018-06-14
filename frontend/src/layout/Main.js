import React, { Component } from 'react';
import LoginComponent from '../components/Login';
import AddAlertComponent from '../components/AddAlert';
import MyAlertsComponent from '../components/MyAlerts';
import AppBarComponent from './AppBar';
import Grid from '@material-ui/core/Grid';
import { Route, Switch, Redirect } from 'react-router-dom';


export default class MainComponent extends Component {

  constructor(props){
    super(props);
    this.check_login();
  }

  check_login(){
    console.log("checking login");
    var ls = localStorage.getItem("user");
    if(!ls){
        this.props.history.push('/login');
    }
  }

  logout(){
    localStorage.removeItem("user");
    this.props.history.push('/login');
  }

  render() {
    const classes = this.props;

    return (
      <div className={classes.root}>
           <AppBarComponent logout={this.logout.bind(this)} check_login={this.check_login.bind(this)}></AppBarComponent>
           <Grid container className={classes.root} justify="center" alignItems="center" spacing={16}>
            <Switch>
              <Route path='/addalert' component={AddAlertComponent} />
              <Route path='/myalerts' component={MyAlertsComponent} />
            </Switch>
          </Grid>
      </div>
    );
  }
}
