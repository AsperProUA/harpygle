import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import Divider from '@material-ui/core/Divider';

import IconOrders from '../icons/icon_order';

const styles = theme => ({
  logo: {
    width: '100%',
    height: '200px',
    backgroundColor: 'inherit',
    paddingTop: '43px',
    textAlign: 'center',
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
  svgIcon: {
    width: '3rem',
    marginLeft: '-1rem',
    marginRight: '-1rem',
  },
  menu: {
    '& a': {
      textDecoration: 'none',
    },
    '& hr': { backgroundColor: theme.palette.grey[500], },
  },
  root: {
    backgroundColor: theme.palette.grey[900],
    width: '100%',
    borderRadius: '0',
    boxShadow: 'none',
  },
});

function ListItemComposition(props) {
  const { classes } = props;
  //console.log(props.role);
  return (
    <Paper className={classes.root} onClick={() => {props.hide && props.hide()}}>
      <div className={classes.logo}>
        <Link to='/'>
          <img src='harpygle Logo white.png' width={114}></img>
        </Link>
      </div>
      <MenuList className={classes.menu}>
        <Link to='delivery'>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SvgIcon viewBox='0 0 27 27' className={classes.svgIcon}>
                <g id="iconfinder_basket_925892"  transform="translate(0 -56.3)">
                  <g id="Group_360" data-name="Group 360" transform="translate(9.927 75.087)">
                    <path id="Path_400" data-name="Path 400"  d="M156.106,352.113a3.606,3.606,0,1,1,3.606-3.606A3.61,3.61,0,0,1,156.106,352.113Zm0-5.839a2.233,2.233,0,1,0,2.233,2.233A2.236,2.236,0,0,0,156.106,346.274Z" transform="translate(-152.5 -344.9)" />
                    <path id="Path_401" data-name="Path 401"  d="M313.206,352.113a3.606,3.606,0,1,1,3.606-3.606A3.61,3.61,0,0,1,313.206,352.113Zm0-5.839a2.233,2.233,0,1,0,2.233,2.233A2.236,2.236,0,0,0,313.206,346.274Z" transform="translate(-299.374 -344.9)" />
                  </g>
                  <path id="Path_402" data-name="Path 402"  d="M27.321,76.115H9.973a.676.676,0,0,1-.664-.527L4.954,57.674H.684a.687.687,0,0,1,0-1.374H5.494a.676.676,0,0,1,.664.527l1.367,5.624H32.639a.674.674,0,0,1,.573.312.7.7,0,0,1,.059.651l-5.318,12.3A.7.7,0,0,1,27.321,76.115ZM10.513,74.742H26.871L31.6,63.819H7.864Z" />
                </g>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Request" />
          </MenuItem>
        </Link>
        <Divider />
        <Link to='inventory'>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SvgIcon viewBox='0 0 27 27' className={classes.svgIcon}>
                <path id="iconfinder_friend_group_people_team_members_3994366"  d="M23.59,21.182a5.24,5.24,0,1,0-8.775-5.731,8.767,8.767,0,0,0-1.725-1.269,5.25,5.25,0,1,0-8.68,0A8.72,8.72,0,0,0,0,21.735a1.749,1.749,0,0,0,1.75,1.75H12.294a8.667,8.667,0,0,0-1.794,5.25,1.749,1.749,0,0,0,1.75,1.75h14A1.749,1.749,0,0,0,28,28.735a8.72,8.72,0,0,0-4.41-7.552Zm-4.34-4.7a1.75,1.75,0,1,1-1.75,1.75,1.75,1.75,0,0,1,1.75-1.75ZM7,11.235a1.75,1.75,0,1,1,1.75,1.75A1.75,1.75,0,0,1,7,11.235Zm1.75,5.25a5.255,5.255,0,0,1,4.949,3.5H3.8a5.255,5.255,0,0,1,4.949-3.5Zm5.551,10.5a5.249,5.249,0,0,1,9.9,0Z" transform="translate(0 -5.979)" />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Team" />
          </MenuItem>
        </Link>
        <Divider />
        
        <Link to='earnings'>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SvgIcon viewBox='0 0 27 27' className={classes.svgIcon}>
                <path id="dollar-sign"  d="M9.841,10.941,4.778,9.459A1.383,1.383,0,0,1,5.168,6.75H8.275a2.861,2.861,0,0,1,1.6.492.731.731,0,0,0,.914-.094l1.631-1.594a.76.76,0,0,0-.084-1.148A6.628,6.628,0,0,0,8.285,3V.75A.752.752,0,0,0,7.535,0h-1.5a.752.752,0,0,0-.75.75V3H5.168A5.136,5.136,0,0,0,.058,8.606a5.366,5.366,0,0,0,3.928,4.528l4.8,1.406A1.383,1.383,0,0,1,8.4,17.25H5.294a2.861,2.861,0,0,1-1.6-.492.731.731,0,0,0-.914.094L1.146,18.445a.76.76,0,0,0,.084,1.148A6.628,6.628,0,0,0,5.285,21v2.25a.752.752,0,0,0,.75.75h1.5a.752.752,0,0,0,.75-.75V20.991a5.3,5.3,0,0,0,4.955-3.408,5.147,5.147,0,0,0-3.4-6.642Z" transform="translate(-0.036)" />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Earnings" />
          </MenuItem>
        </Link>
        <Divider />
        <Link to='analytics'>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SvgIcon viewBox='0 0 27 27' className={classes.svgIcon}>
                <g id="Group_405" data-name="Group 405"  transform="translate(-558 242)">
                  <g id="iconfinder_pie-chart_353433" transform="translate(558 -242)">
                    <path id="Path_379" data-name="Path 379"  d="M17.792,11.75A10.823,10.823,0,1,0,28.615,22.573H17.792Z" transform="translate(-6.969 -9.5)" />
                    <path id="Path_380" data-name="Path 380"  d="M34.432,7.052V17.876H45.255A10.821,10.821,0,0,0,34.432,7.052Z" transform="translate(-21.28 -7.052)" />
                  </g>
                </g>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Analytics" />
          </MenuItem>
        </Link>
        <Divider />
        <Link to='profile'>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SvgIcon viewBox='0 0 27 27' className={classes.svgIcon}>
                <path id="cog"  d="M40.134,22.309l2.154,1.243a.608.608,0,0,1,.276.707A12.516,12.516,0,0,1,39.8,29.04a.607.607,0,0,1-.75.114L36.9,27.911a9.683,9.683,0,0,1-3.071,1.776v2.486a.607.607,0,0,1-.474.592,12.635,12.635,0,0,1-5.521,0,.608.608,0,0,1-.475-.593V29.687a9.682,9.682,0,0,1-3.071-1.776l-2.152,1.243a.607.607,0,0,1-.75-.114,12.516,12.516,0,0,1-2.764-4.781.608.608,0,0,1,.276-.707l2.154-1.243a9.78,9.78,0,0,1,0-3.548L18.9,17.517a.608.608,0,0,1-.276-.707,12.516,12.516,0,0,1,2.764-4.781.607.607,0,0,1,.75-.114l2.152,1.243a9.683,9.683,0,0,1,3.071-1.776V8.9a.607.607,0,0,1,.474-.592,12.635,12.635,0,0,1,5.521,0,.608.608,0,0,1,.475.593v2.486A9.682,9.682,0,0,1,36.9,13.159l2.152-1.243a.607.607,0,0,1,.75.114,12.516,12.516,0,0,1,2.764,4.781.608.608,0,0,1-.276.707l-2.154,1.243a9.78,9.78,0,0,1,0,3.548Zm-5.5-1.774a4.044,4.044,0,1,0-4.044,4.044A4.048,4.048,0,0,0,34.635,20.535Z" transform="translate(-18.592 -7.999)" />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Account Settings" />
          </MenuItem>
        </Link>
      </MenuList>
    </Paper>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);