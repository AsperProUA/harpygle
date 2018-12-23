import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Button } from '@material-ui/core';
import { connect } from 'react-redux'

import UserInfo from '../../globalComponents/UserInfo';

const fakeOrders = [
    {
        id: 2,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        itemPrice: 80,
        fees: 40,
        quantity: 1,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
    },
    {
        id: 1,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        itemPrice: 80,
        fees: 40,
        quantity: 4,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
    },
    {
        id: 3,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        itemPrice: 80,
        fees: 40,
        quantity: 2,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
    },
    {
        id: 4,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        itemPrice: 80,
        fees: 40,
        quantity: 7,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
    },
];

const styles = theme => ({
    row: {
        // padding:'20px 5px',
    },
    userBadge: {
        [theme.breakpoints.up('md')]: {
            order: 5,
        },
    },
    photo: {
        width: 100,
        height: 100,
        padding: 5,
        textAlign: 'center',
        flexShrink: 0,
        position: 'relative',
        marginRight: 50,
        border: '1px solid #CECECE',
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
        }
    },
    city: {
        fontSize: 18,
        color: '#979797',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',

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
        margin: '25px auto',
    },
    ordersCount: {
        fontSize: 30,
        color: '#979797',
        fontWeight: 'bold',
        margin: '25px auto',
    },
    hrLight: {
        border: '0.5px solid #E9E9E9',
        margin: '25px auto',
        width: '80%'
    },
    iconMap: {
        backgroundImage: 'url("pictures/icons/business/map-marker-alt.png")'
    },
    icon: {
        width: 32,
        height: 32,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
    },
    paper: {
        padding: 15,
    },
    productInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#979797',
        fontSize: 18,
        padding: 25,
        lineHeight: '1.5em',
        '& p': {
            margin: 0,
        },
    },
    priceBox: {
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: 14,
        color: '#979797',
        '&>div': {
            display: 'flex',
            justifyContent: 'space-between',
        }
    },
    deliveryInfo: {
        color: '#979797',
        padding: 25,
    },
    orderItem: {
        margin: 10,
    },
    quantity: {
        position: 'absolute',
        color: '#636363',
        fontSize: 50,
        fontWeight: 'bold',
        top: 80,
        left: 85,
    },
    x: {
        fontSize: 30,
        color: '#CECECE',
    }
})

class PendingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: fakeOrders,
            user: {
                city: 'Kharkiv',
                completedOrders: 13,
                inProgressOrders: 2,
            },
        }
    }

    componentDidMount() {
        // fetch products & set state;
    }

    renderOrders = (order) => {
        const { classes } = this.props
        return (
            <Grid container key={order.id}>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={2} className={classes.productInfo}>
                    <div className={classes.photo}>
                        <img src={order.photo}></img>
                        <div className={classes.quantity}><span className={classes.x}>X</span>{order.quantity}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={6} xl={7} className={classes.productInfo}>
                    <div>
                        <p>{order.name}</p>
                        <p>{order.description}</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} className={classes.priceBox}>
                    <div className={classes.price}>
                        <span>Items Price</span>
                        <span style={{ fontWeight: 'bold', fontSize: 18 }}>
                            {order.itemPrice}
                            <span style={{ fontSize: 12 }}> MAD</span>
                        </span>
                    </div>
                    <div className={classes.price}>
                        <span>Harpygle Fees </span>
                        <span style={{ fontWeight: 'bold', fontSize: 18 }}>
                            {order.fees}
                            <span style={{ fontSize: 12 }}> MAD</span>
                        </span>
                    </div>
                    <div>
                        <span>Total Order </span>
                        <span style={{ fontWeight: 'bold', fontSize: 18 }}>
                            {(order.itemPrice + order.fees) * order.quantity}
                            <span style={{ fontSize: 12 }}> MAD</span>
                        </span>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={7} className={classes.deliveryInfo}>
                    <p style={{ fontWeight: 'bold' }}>To</p>
                    <p>{order.deliveryAddress}</p>
                </Grid>
                <Grid item xs={12} sm={12} md={5} className={classes.deliveryInfo}>
                    <p style={{ fontWeight: 'bold' }}>Due</p>
                    <p>{order.date}</p>
                </Grid>
            </Grid>
        );
    }

    render() {
        const { orders } = this.state;
        const { classes } = this.props;
        return (
            <Grid container spacing={0} >
                <Grid item sm={12} xs={12} md={5} lg={4} className={classes.userBadge}>
                    <Paper className={classes.paper}>
                        <UserInfo />
                        <div>
                            <hr className={classes.hrLight} />
                            <div className={classes.city}>
                                <span className={[classes.icon, classes.iconMap].join(' ')}></span><span style={{ marginLeft: 15 }}>{this.state.user.city}</span>
                            </div>
                            <hr className={classes.hrLight} />
                            <div className={classes.orders}>
                                <p className={classes.orderLabel}>MY ORDERS</p>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div className={classes.ordersType}>
                                            Paid Orders
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.state.user.completedOrders}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.ordersType}>
                                            Pending Orders
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.state.user.inProgressOrders}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.ordersType}>
                                            Delivered Orders
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.state.user.inProgressOrders}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={8} style={{ border: 'none', boxShadow: 'none' }}>
                    {orders.map(order => {
                        return <Paper key={order.id} className={classes.orderItem}>{this.renderOrders(order)}</Paper>;
                    })}
                </Grid>
            </Grid>
        );
    }
}

PendingOrders.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(PendingOrders));