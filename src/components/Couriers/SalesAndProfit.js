import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getData from '../../services/getData';

import UserInfo from '../globalComponents/UserInfo';


const styles = theme => ({
    paper: {
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        borderRadius: 0,
        color: '#636363',
        fontWeight: 'bold',
        maxWidth: 300,
        margin: 'auto',
    },
    root: {
        padding: 16,
        paddingTop: 50,
        margin: 0,
        width: '100%',
    },
    label: {
        display: 'flex',
        padding: 8,
        justifyContent: 'space-between',
        margin: '0 20px',
    },
    icon: {
        width: 32,
        height: 32,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
    },
    text: {
        fontSize: 24,

    },
    icon1: {
        backgroundImage: "url('pictures/icons/business/Group 374.png')",
    },
    icon2: {
        backgroundImage: "url('pictures/icons/business/Group 375.png')",
    },
    icon3: {
        backgroundImage: "url('pictures/icons/business/Group 373.png')",
    },
    iconMap: {
        backgroundImage: 'url("pictures/icons/business/map-marker-alt.png")'
    },
    data: {
        fontSize: 40,
        fontWeight: 'bold',
        padding: '80px 0',
        textAlign: 'center',
    },
    city: {
        fontSize: 18,
        color: '#979797',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 400,
    },
    orders: {
        textAlign: 'center',
    },
    orderLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#979797',
    },
    ordersType: {
        fontSize: 12,
        color: '#979797',
        margin: '15px auto',
        fontWeight: 400,
    },
    ordersCount: {
        fontSize: 30,
        color: '#979797',
        fontWeight: 'bold',
        margin: '25px auto',
    },
    hrLight: {
        border: '0.5px solid #E9E9E9',
        margin: '20px auto',
        width: '80%',
    }
})

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSales: 2972.00,
            totalCost: 1584.00,
            totalProfit: 1388.00,
            completedOrders: 13,
            inProgressOrders: 2,
        }
    }

    ////////////////////////////////////////////////////////////////
    // need remake when backend will be ready
    componentDidMount() {
        getData({ url: 'courier/sales/' /* + id*/ }).then(data => {
            this.setState(currentState => {
                const { totalSales, totalCost, totalProfit, completedOrders, inProgressOrders } = data;
                totalSales && (currentState.totalSales = totalSales);
                totalCost && (currentState.totalCost = totalCost);
                totalProfit && (currentState.totalProfit = totalProfit);
                completedOrders && (currentState.completedOrders = completedOrders);
                inProgressOrders && (currentState.inProgressOrders = inProgressOrders);
                return currentState;
            });
        });
    }
    ////////////////////////////////////////////////////////////////

    render() {
        const { classes, user } = this.props;
        const { totalSales, completedOrders, inProgressOrders } = this.state;

        return (
            <Grid container spacing={16} className={classes.root}>
                <Grid item lg={9} md={6} sm={6} xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.label}>
                            <span className={classes.text}>Total Sales</span><span className={[classes.icon, classes.icon1].join(' ')} ></span>
                        </div>
                        <hr />
                        <div className={classes.data}>
                            ${totalSales}
                        </div>
                    </Paper>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Paper className={classes.paper}>
                        <UserInfo />
                        <div>
                            <hr className={classes.hrLight} />
                            <div className={classes.city}>
                                <span className={[classes.icon, classes.iconMap].join(' ')}></span><span style={{ marginLeft: 15 }}>{user.city}</span>
                            </div>
                            <hr className={classes.hrLight} />
                            <div className={classes.orders}>
                                <p className={classes.orderLabel}>MY ORDERS</p>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            Completed
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {completedOrders}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            In Progress
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {inProgressOrders}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

Analytics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Analytics));