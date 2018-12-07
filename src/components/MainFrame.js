import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppBar from './AppBar';
import BusinessMenu from './businessOwners/Menu';
import BusinessProfile from './businessOwners/Profile';
import Products from './products';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 0, // theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100vh',
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
  relative:{
    position: 'relative',
    height: '100%',
  },
  preloaderBG: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor:'rgba(0,0,0,0.8)',
  }
});

const preloader = (
  <div>
    <h1>
      Loading
      </h1>
  </div>
);

function MainFrame(props) {
  const { classes, role } = props;
  const renderMenu = () => {
    switch (role) {
      case 'BOwners': return <BusinessMenu />;
      case 'suppliers': return <div>supplierMenu</div>

    }
  }
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Grid container spacing={0}>
          <Grid item md={3} lg={2} className={classes.selectionMobile}>
            <Paper className={classes.paper} >
              {renderMenu()}
            </Paper>
          </Grid>
          <Grid item sm={12} md={9} lg={10} >

            <Paper className={classes.paper}>
              <AppBar />
              <Grid container className={classes.relative}>
                {props.isLoad && (
                  <div className={classes.preloaderBG}>

                  </div>
                )}
                <Switch>
                  <Route
                    exact path='/profile'
                    render={() => {
                      switch (role) {
                        case 'BOwners': return <BusinessProfile />;
                        case 'suppliers': return <div>supplierProfile</div>

                      }

                    }} />

                  <Route
                    exact path='/products'
                    render={() => <Products />}
                  />
                </Switch>

              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

MainFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainFrame);