import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import getData from '../../services/getData';
import AddIcon from '@material-ui/icons/Add';

import AvailableCouriers from './deliveryTabs/AvailableCouriers';
import SheduleANewOrder from './deliveryTabs/SheduleANewOrder';
import PendingOrders from './deliveryTabs/PendingOrders';
import InProgress from './deliveryTabs/InProgress';
import ReplacedOrders from './deliveryTabs/ReplacedOrders';
import CompletedOrders from './deliveryTabs/CompletedOrders';
import CancelledOrders from './deliveryTabs/CancelledOrders';

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: 'calc(100% - 130px)',
    },
    tabRoot: {
        maxWidth: '100vw',
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            maxWidth: 'calc(100vw - 240px)',
            width: 'calc(100vw - 240px)',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 'calc(100vw - 240px - 280px)',
            width: 'calc(100vw - 240px - 280px)',
        },
        display: 'inline-block',
    },
    tabs: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    container:{
        width: '100%',
    },
    indicator: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    btn: {
        width: 260,
        height: 42,
        margin: 'auto',
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
        [theme.breakpoints.down('xs')]:{
            width: '100%',
        }
    },
    btnShedule: {
        verticalAlign: 'top',
        
    },
});

class Delivery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
        }
    }

    changeCategory = (e, value) => {
        console.log(value)
        this.setState({ currentTab: value });
    }

    render() {
        const { classes } = this.props;
        const { currentTab } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.tabs}>
                    <div className={classes.tabRoot}>
                        <Tabs
                            className={classes.tabs}
                            value={currentTab}
                            onChange={this.changeCategory}
                            classes={{
                                indicator: classes.indicator,
                                flexContainer: classes.container,
                            }}
                            scrollable
                            scrollButtons="auto"
                        >

                            <Tab label='Available Couriers' classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                            <Tab label='Pending Orders' classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                            <Tab label='In-progress Orders' classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                            <Tab label='Replaced Orders' classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                            <Tab label='Completed Orders' classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                            <Tab label='Cancelled Orders' classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                        </Tabs>
                    </div>
                    <Button onClick={()=>this.changeCategory(null, -1)} className={[classes.btnShedule, classes.btn].join(' ')}> <AddIcon />SCHEDULE A NEW ORDER</Button>
                </div>
                {currentTab == 0 && <AvailableCouriers />}
                {currentTab == 1 && <PendingOrders />}
                {currentTab == 2 && <InProgress/>}
                {currentTab == 3 && <ReplacedOrders />}
                {currentTab == 4 && <CompletedOrders />}
                {currentTab == 5 && <CancelledOrders />}
                {currentTab == -1 && <SheduleANewOrder/>}
            </div>
        );
    }
}

Delivery.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Delivery);