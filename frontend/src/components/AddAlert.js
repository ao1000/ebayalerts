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
import MenuItem from '@material-ui/core/MenuItem';
import Http from '../services/http';

export default class AddAlertComponent extends Component {
  constructor(props){
    super(props);
    this.http = new Http();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      "search_phrase" : "",
      "interval" : 0,
      "user_id": this.user.id
    }
  }

  async postAlert(){
    var result = await this.http.addAlert(this.state);
    console.log(result);
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
                  onChange = {e => this.setState({"search_phrase":e.target.value})}
                  className={classes.textField}
                  margin="normal"
                />
                <br />
                <TextField
                    id="select-currency"
                    select
                    className={ classes.textField }
                    value={ this.state.interval }
                    onChange={ e => this.setState({"interval":e.target.value})}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Select interval"
                    margin="normal"
                  >
                    <MenuItem></MenuItem>
                      <MenuItem key={2} value={2}>
                        {"2 Minutes"}
                      </MenuItem>
                      <MenuItem key={10} value={10}>
                        {"10 Minutes"}
                      </MenuItem>
                      <MenuItem key={30} value={30}>
                        {"30 Minutes"}
                      </MenuItem>
                  </TextField>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="raised" onClick={this.postAlert.bind(this)}>Add Alert</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }

}
