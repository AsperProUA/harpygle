import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppBar from './AppBar';
import Menu from './Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 0, // theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    borderRadius: 0,
    position: 'relative',
  },
  selectionMobile: {

    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '250px',
    },
  },
});

function MainFrame(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item md={3} lg={2} className={classes.selectionMobile}>
          <Paper className={classes.paper} >
            <Menu></Menu>
          </Paper>
        </Grid>
        <Grid item sm={12} md={9} lg={10} >
          <Paper className={classes.paper}>
            <AppBar />
            <Grid container>
              <BrowserRouter>
                <Switch>
                  
                </Switch>
              </BrowserRouter>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

MainFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainFrame);