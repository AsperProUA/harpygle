import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import PartnerAnalyticsProfits from './AnalyticsProfits';
import PartnerAnalyticsDrivers from './AnalyticsDrivers'; 
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import TrendingUpOutlined from '@material-ui/icons/TrendingUpOutlined';
import People from '@material-ui/icons/People';
import { Avatar } from '@material-ui/core';
import '../../css/partnerTab.css'


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff !important",
    width: "100%",
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    color: '#636363',
    borderBottom: '#fff',
    '&:hover': {
      color: '#000',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#000',
      fontWeight: theme.typography.fontWeightMedium,
      borderBottom: '#fff',
    },
    '&:focus': {
      color: '#000',
    },
  },
  tabSelected: {},
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs indicatorColor="none" className={classes.root} value={value} onChange={this.handleChange}>
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} icon={<TrendingUpOutlined />} label="Sales and Profits" />
            <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} icon={<People />} label="Top Drivers" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><PartnerAnalyticsProfits /></TabContainer>}
        {value === 1 && <TabContainer><PartnerAnalyticsDrivers /></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles()(SimpleTabs);

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(SimpleTabs));