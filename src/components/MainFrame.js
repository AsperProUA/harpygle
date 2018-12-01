import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    },
  },
});

function AutoGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item md={2} xs={3} className={classes.selectionMobile}>
          <Paper className={classes.paper} >
            <Menu></Menu>
          </Paper>
        </Grid>
        <Grid item sm={12} md={10}>
          <Paper className={classes.paper}>
            <AppBar/>
            <Grid container>
                <Grid item sm={6}>
                    <Paper>6col</Paper>
                </Grid>
                <Grid item sm={6}>
                    <Paper>6col</Paper>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);