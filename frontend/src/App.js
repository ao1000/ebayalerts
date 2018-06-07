import React, { Component } from 'react';
import MainComponent from './layout/Main';
import LoginComponent from './components/Login';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';


class App extends Component {


  // check_login(){
  //   var ls = localStorage.getItem("user");
  //   if(ls){
  //     ls = JSON.parse(ls);
  //     if(ls.id && ls.email){
  //       return true;
  //     }else{
  //       return false;
  //     }
  //   }
  // }

  render() {
    const classes = this.props;
    return (
      <BrowserRouter>
        <div className="App">
            <Switch>
              <Route path='/login' component={ LoginComponent } />
              <Route path='/' component={ MainComponent } />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
  /*
  render() {
    const classes = this.props;
    return (
      <BrowserRouter>
        <div className="App">
           <AppBarComponent auth={this.check_login()}></AppBarComponent>
           <Grid container className={classes.root} spacing={16}>
            <Switch>
              <Route path='/addalert' component={ AddAlertComponent }/>
              <Route path='/myalerts' component={ MyAlertsComponent }/>
              <Route path='/' component={ LoginComponent } auth={this.check_login()}/>
            </Switch>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
  */
}

export default App;
