import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

export default class LoginComponent extends Component {
  constructor(props){
    super(props);
    this.state = { "email" : "" };
    this.check_login();
  }

  check_login(){
    var ls = localStorage.getItem("user");
    if(ls){
      ls = JSON.parse(ls);
      if(ls.id && ls.email){
        this.history.push('/myalerts');
      }
    }
  }

  onFind(e){
    fetch('http://localhost:8000/users/find-email/'+this.state.email+'/')
      .then(response => {
        if(response.ok){
          return response.text();
        }else{
          throw(response);
        }
      })
      .then( data => {
          localStorage.setItem("user",data);
          this.props.history.push('/myalerts');
      } )
      .catch( error => error.json() )
      .then( errordata => console.log(errordata.error));
  }

  render(){
    const classes  = this.props;
    return (
        <Grid container justify="center" alignItems="center">
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <TextField
                    id="email"
                    label="Your Email Address"
                    value={this.state.email}
                    onChange = {e=>this.setState({"email":e.target.value})}
                    className={classes.textField}
                    margin="normal"
                  />
              </CardContent>
              <CardActions>
                <Button color="primary" variant="raised" onClick={e=>this.onFind(e)}>Continue</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    )
  }
}


export class AddAlertComponent extends Component {
  constructor(props){
    super(props);
    this.state = { "search" : "" }
  }

  render(){
    const classes = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <TextField
                  id="search"
                  label="Search eBay Products"
                  value={this.state.search}
                  onChange = {e=>this.setState({"search":e.target.value})}
                  className={classes.textField}
                  margin="normal"
                />
            </CardContent>
            <CardActions>
              <Button color="primary" variant="raised">Add Alert</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }

}
