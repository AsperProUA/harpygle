import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarIcon from '@material-ui/icons/DateRange';
import ProductsIcon from '@material-ui/icons/Work';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings'
import EarningsIcon from '@material-ui/icons/AttachMoney'
import { Link } from 'react-router-dom';

const styles = theme => ({
  logo: {
    width: '100%',
    height: '200px',
    backgroundColor: 'inherit',
    paddingTop: '43px',
  },
  menuItem: {
    '&:focus': {
      color: theme.palette.common.white,
      '& $primary, & $icon': {
        color: theme.palette.common.white,

      },
    },
  },
  primary: {
    color: theme.palette.grey[500],
  },
  icon: {
    color: theme.palette.grey[500],
  },
  menu: {
    '& hr': { color: theme.palette.grey[500], },
  },
  root: {
    // position: 'fixed',
    backgroundColor: theme.palette.grey[900],
    height: '100%',
    width: '100%',
  },
});

function ListItemComposition(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <div className={classes.logo}>
        <Link to='/'>
          <img src='harpygle Logo white@1x.png' width={114}></img>
        </Link>
      </div>
      <MenuList className={classes.menu}>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
        </MenuItem>
        <hr></hr>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Manual Delivery" />
        </MenuItem>
        <hr></hr>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <ProductsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Products" />
        </MenuItem>
        <hr></hr>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Account Settings" />
        </MenuItem>
        <hr></hr>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <EarningsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Earnings" />
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);