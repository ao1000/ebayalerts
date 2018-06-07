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

export default class AddAlertComponent extends Component {
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
