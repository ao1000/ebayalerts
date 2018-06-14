import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Http from '../services/http'

export default class MyAlertsComponent extends Component {
  constructor(props){
    super(props);
    this.data = [];
    this.state = { "data" : [] };
    this.http = new Http();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getAlerts();
  }

   getAlerts(){
    this.http.myAlerts(this.user.id).then(
      (data) => {
        this.setState({"data" : data }) ;
        //console.log(this.state.data);
      }
    )
    //this.setState( {"data": await this.http.myAlerts(this.user.id)} );
  }

  render(){
    //var data = this.getAlerts();
    //this.getAlerts();

    const classes = this.props;
    return (
      <Grid item xs={10}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{"Search Phrase"}</TableCell>
                <TableCell numeric>{"Create Date"}</TableCell>
                <TableCell numeric>{"Interval"}</TableCell>
                <TableCell numeric>{"Active"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.search_phrase}
                    </TableCell>
                    <TableCell numeric>{item.date_created}</TableCell>
                    <TableCell numeric>{item.interval}</TableCell>
                    <TableCell numeric>{item.active ? "Yes" : "No"}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric>
                  <Button color="primary" onClick={e=>this.props.history.push('/addalert')}>+Add</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      );
  }
}
