import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import Message from '@material-ui/icons/ChatBubble';
import getData from '../../services/getData';

///////////////////////////////////////////////////////////////////////
// fake data
const couriers = [
    {

    },
];
///////////////////////////////////////////////////////////////////////

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        margin: 26,
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    categories: {
        width: 'auto',
    },
    categoryRoot: {
        color: '#979797',
        fontSize: '20px!important',
        fontWeight: 400,
        textTransform: 'none',
        opacity: '1',
    },
    categoryLabel: {
        margin: '0px -11px',
    },
    ctegorySelected: {
        color: '#000',
        fontWeight: 'bold!important',
        fontSize: 20,
    },
    indicator: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    btn: {
        width: 260,
        height: 42,
        marginBottom: 50,
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
    },
    btnShedule: {

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
                <div className={classes.nav}>
                    <Tabs
                        className={classes.categories}
                        value={currentTab}
                        onChange={this.changeCategory}
                        classes={{
                            indicator: classes.indicator,
                        }}
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
                    <Button className={[classes.btnShedule, classes.btn].join(' ')}>SCHEDULE A NEW ORDER</Button>
                </div>
                <Grid container spacing={24} className={classes.productList}>
                    {/* {productList.map(product => {
                        return (this.renderProduct(product));
                    })} */}
                </Grid>
            </div>
        );
    }
}

Delivery.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Delivery);