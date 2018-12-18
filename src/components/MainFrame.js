import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';

import AppBar from './AppBar';
import BusinessMenu from './businessOwners/Menu';
import PartnerMenu from './partnerOwners/Menu';
import BusinessProfile from './businessOwners/Profile';
import PartnerProfile from './partnerOwners/Profile';
import Products from './products';
import BusinessEarnings from './businessOwners/Earning';
import PartnerEarnings from './partnerOwners/Earning'
import BusinessAnalytics from './businessOwners/Analytics';
import BusinessSuppliers from './businessOwners/Suppliers';
import BusinessOrders from './businessOwners/Orders';
import BusinessDelivery from './businessOwners/Delivery';
import PartnerRequest from './partnerOwners/Request';
import PartnerTab from './partnerOwners/Tabs';
import PartnerTeam from './partnerOwners/Team';
import PartnerChat from './partnerOwners/Chat'


import BusinessInventory from './businessOwners/Inventory';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.grey[900],

  },
  selectionMobile: {

    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '250px',
    },
  },
  content: {
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    maxWidth: '100%',
    backgroundColor: 'white',
  },
  preloaderBG: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  menu: {
    width: menuWidth,
    backgroundColor: theme.palette.grey[900],
  }
});

const preloader = (
  <h1>
    Loading
  </h1>
);

const menuWidth = 240;

class MainFrame extends Component {
  constructor(props) {
    super(props);

  }

  renderMenu = () => {
    switch (this.props.role) {
      case 'BOwners': return <BusinessMenu />;
      case 'suppliers': return <div>supplierMenu</div>;
      case 'partners': return <PartnerMenu/>;

    }
  }

  render() {
    const { classes, role, isLoad } = this.props;

    return (

      <BrowserRouter>
        <div className={classes.root}>
          <Hidden smDown implementation="css">
              {this.renderMenu()}
          </Hidden>
          <Grid container className={classes.content}>
            <AppBar role={role}/>
            {isLoad && (
              <div className={classes.preloaderBG}>
                {preloader}
              </div>
            )}
            <Switch>
              <Route
                exact path='/profile'
                render={() => {
                  switch (role) {
                    case 'BOwners': return <BusinessProfile />;
                    case 'suppliers': return <div>supplierProfile</div>;
                    case 'partners' : return <PartnerProfile />
                  }
                }} />
              <Route
                exact path='/earnings'
                render={() => {
                  switch (role) {
                    case 'BOwners': return <BusinessEarnings />;
                    case 'suppliers': return <div>supplierProfile</div>
                    case 'partners': return <PartnerEarnings />
                  }
                }} />
              <Route
                exact path='/analytics'
                render={() => {
                  switch (role) {
                    case 'BOwners': return <BusinessAnalytics />;
                    case 'suppliers': return <div>supplierProfile</div>;
                    case 'partners': return <PartnerTab />;
                  }
                }} />
              <Route
                exact path='/suppliers'
                render={() => {
                  switch (role) {
                    case 'BOwners': return <BusinessSuppliers />;
                    case 'suppliers': return <div>supplierProfile</div>;
                  }
                }} />
              <Route
                exact path='/orders'
                render={() => {
                  switch (role) {
                    case 'BOwners': return <BusinessOrders />;
                    case 'suppliers': return <div>supplierProfile</div>;
                  }
                }} />
              <Route
                exact path='/delivery'
                render={() => {
                  switch (role) {
                    case 'BOwners': return <BusinessDelivery />;
                    case 'suppliers': return <div>supplierProfile</div>;
                  }
                }} />
                <Route
                  exact path='/inventory'
                  render={() => {
                    switch(role) {
                      case 'BOwners': return <BusinessInventory />;
                      case 'suppliers': return <div>supplierProfile</div>;
                    }
                  }}
                />
              <Route
                exact path='/request'
                render={() => {
                  switch (role) {
                    case 'partners': return <PartnerRequest />
                  }
                }} />
              <Route
                exact path='/team'
                render={() => {
                  switch (role) {
                    case 'partners': return <PartnerTeam />;
                  }
                }} />
              <Route
                exact path='/products'
                render={() => <Products />}
              />
              <Route
                exact path='/chat'
                render={() => <PartnerChat />}
              />
            </Switch>
          </Grid>
        </div >
      </BrowserRouter >
    );
  }
}

MainFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainFrame);