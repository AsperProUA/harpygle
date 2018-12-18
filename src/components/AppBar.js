import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Message from '@material-ui/icons/ChatBubble';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from './globalComponents/Avatar';

import BusinessMenu from './businessOwners/Menu';
import CourierMenu from './Couriers/Menu'
import logOut from '../services/logOut';
const styles = theme => ({
  root: {
    width: '100%',
    color: theme.palette.grey[900],
    height: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    backgroundColor: theme.palette.grey[900],
    width: 240,
    textAlign: 'center',
  },
  accountMenuLink: {
    textDecoration: 'none',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#636363',
    height: '40px',
    lineHeight: '40px',
    '& *': {
      verticalAlign: 'middle',
    }
  },
  accountIcon: {
    width: 32,
    height: 32,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: 1,
    display: 'inline-block',
  },
  accountIcon1: {
    backgroundImage: "url('pictures/icons/menu/Group 289.png')",
  },
  accountIcon2: {
    backgroundImage: "url('pictures/icons/menu/Group 288.png')",
  },
  userMenuButtonsOnline: {
    backgroundColor: '#88C601',
    color: '#fff',
    border: 'none',
    width: 107,
    height: 31,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 'bold',
  },
  userMenuButtonsOffline: {
    backgroundColor: '#FFD013',
    color: '#fff',
    border: 'none',
    width: 107,
    height: 31,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 'bold',
  },
  userMenuButtons: {
    width: 107,
    height: 31,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 'bold',
    border: '1px solid #707070',
  },
  mobileAvatarItem: {
    height: 60,
  },
  menuPaper: {
    top: 85,
  }
});

class MainAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileOpen: false,
    online: true,
  };

  renderMainMenu = () => {
    switch (this.props.role) {
      case 'BOwners': return <BusinessMenu hide={this.handleDrawerToggle} />;
      case 'suppliers': return <div>supplierMenu</div>
      case 'supplier': return <CourierMenu hide={this.handleDrawerToggle}/>;

    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  changeOnline = () => {
    this.setState({ online: !this.state.online })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, online } = this.state;
    const { classes, user } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        PaperProps={{
          style: {
            marginTop:65
          },
        }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem >
          <Button
            className={online ? classes.userMenuButtonsOnline : classes.userMenuButtons}
            onClick={() => {
              if (online) {
                return undefined;
              }
              this.changeOnline();
              this.handleMenuClose();
            }}
          >Online</Button>
          <Button
            className={online ? classes.userMenuButtons : classes.userMenuButtonsOffline}
            onClick={() => {
              if (online) {
                this.changeOnline();
                this.handleMenuClose();
              }
              return undefined;
            }}
          >Offline</Button>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose} className={classes.accountMenuLink}>
          <Link className={classes.accountMenuLink} to='/profile'>
            <span className={[classes.accountIcon, classes.accountIcon1].join(' ')} /> Settings
          </Link>
        </MenuItem>
        <MenuItem className={classes.accountMenuLink} onClick={logOut}>
          <span className={[classes.accountIcon, classes.accountIcon2].join(' ')} /> Logout
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem >
          <IconButton >
            {/* <Badge badgeContent={11} color="secondary"> */}
            <NotificationsIcon />
            {/* </Badge> */}
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem>
          <IconButton >
            <Badge badgeContent={2} color="secondary">
              <Message />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem classes={{ root: classes.mobileAvatarItem }}>
          <Avatar
            size={60}
            online={online}
          />
        </MenuItem>
        <MenuItem>
          <Button
            className={online ? classes.userMenuButtonsOnline : classes.userMenuButtons}
            onClick={() => {
              if (online) {
                return undefined;
              }
              this.changeOnline();
              this.handleMenuClose();
            }}
          >Online</Button>
          <Button
            className={online ? classes.userMenuButtons : classes.userMenuButtonsOffline}
            onClick={() => {
              if (online) {
                this.changeOnline();
                this.handleMenuClose();
              }
              return undefined;
            }}
          >Offline</Button>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose} className={classes.accountMenuLink}>
          <Link className={classes.accountMenuLink} to='/profile'>
            <span className={[classes.accountIcon, classes.accountIcon1].join(' ')} /> Settings
          </Link>
        </MenuItem>
        <MenuItem className={classes.accountMenuLink} onClick={logOut}>
          <span className={[classes.accountIcon, classes.accountIcon2].join(' ')} /> Logout
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Hidden mdUp implementation="css">
              <Drawer
                // container={this.props.container}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {this.renderMainMenu()}
              </Drawer>
            </Hidden>
            <IconButton className={classes.menuButton} onClick={this.handleDrawerToggle} aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            {/* <Typography className={classes.title} variant="h6" noWrap>
              Harpygle
            </Typography> */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton >
                {/* <Badge badgeContent={2} color="secondary"> */}
                <NotificationsIcon />
                {/* </Badge> */}
              </IconButton>
              <IconButton >
                <Badge badgeContent={2} color="secondary">
                  <Message />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}

              >
                <Avatar
                  size={60}
                  online={online}
                />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
  state => ({
    user: state.loginData.user,
  })
)(MainAppBar));