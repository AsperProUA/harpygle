import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import classNames from '@material-ui/core/node_modules/classnames';

import RateToStars from '../../globalComponents/RateToStars';
import UserInfo from '../../globalComponents/UserInfo';
import RateCourier from './RateCourier';


const fakeOrders = [
    {
        id: 1,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        itemPrice: 80,
        fees: 40,
        quantity: 1,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
        sendAddress: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
        courier: {
            id: 'harpygle-courier-6dhzga7rgjps7mukm',
            name: 'Fatima',
            img: 'http://pngimg.com/uploads/face/face_PNG5651.png',
            rate: 4,
        },
        stage: 1,
        completed: false,
    },
    {
        id: 2,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        itemPrice: 80,
        fees: 40,
        quantity: 4,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
        sendAddress: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
        courier: {
            name: 'Oleh',
            img: '',
            rate: 4,
            id: 4
        },
        stage: 3,
        completed: true,
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
        sendAddress: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
        courier: {
            name: 'Igor',
            img: '',
            rate: 4,
            id: 8
        },
        stage: 1,
        completed: false,
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
        sendAddress: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        date: '23 November, 10:00 AM',
        courier: {
            name: 'Mohamed',
            img: '',
            rate: 4,
            id: 7
        },
        stage: 2,
        completed: false,
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
    avatar: {
        display: 'inline-block',
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative',
        marginRight: 10,
        width: 60,
        height: 60,
    },
    courier: {
        display: 'flex',
    },
    photo: {
        border: '1px solid #CECECE',
        width: 100,
        height: 100,
        padding: 5,
        textAlign: 'center',
        flexShrink: 0,
        position: 'relative',
        marginRight: 50,
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
        verticalAlign: 'middle',
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
    },
    courier: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    addressLabel: {
        display: 'inline-block',
        fontWeight: 'bold',
        width: 65,
    },
    address: {
        display: 'inline-block',
    },
    defaultAvatar: {
        backgroundImage: `url(${defaultAvatar})`,
    },
    aboutCourier: {
        display: 'inline-block',
        marginLeft: 8,
        verticalAlign: 'middle',
        fontSize: 20,
    },
    btn: {
        height: 42,
        margin: 'auto',
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
})

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

class CompletedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: fakeOrders,
            openRate: false,
            ratedCourier: null,
        }
    }

    componentDidMount() {
        // fetch products & set state;
    }

    openRate = (courier) => {
        this.setState({ openRate: true, ratedCourier: courier });
    }

    closeRate = () => {
        this.setState({ openRate: false });
    }

    renderOrders = (order) => {
        const { classes } = this.props;
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
                        <div className={classes.address}>
                            <span className={classes.addressLabel}>From</span>{order.sendAddress}
                            <br />
                            <span className={classes.addressLabel}>To</span>{order.deliveryAddress}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} className={classes.courier}>
                    <div >
                        {
                            order.courier.img ?
                                <div className={classes.avatar} style={{ backgroundImage: `url(${order.courier.img})` }} /> :
                                <div className={[classes.avatar, classes.defaultAvatar].join(' ')} />
                        }
                        <div className={classes.aboutCourier}>
                            <span>Order By</span><br />
                            <span style={{ margin: '5px 0', fontWeight: "bold" }}>{order.courier.name}</span>
                            <RateToStars rate={order.courier.rate} />
                        </div>
                    </div>
                    <Button onClick={() => this.openRate(order.courier)} className={classes.btn}>Rate this courier</Button>
                </Grid>
            </Grid >
        );
    }

    render() {
        const { orders } = this.state;
        const { classes } = this.props;
        return (
            <Grid container spacing={0} >
                <Grid item sm={12} xs={12} md={4} lg={3} className={classes.userBadge}>
                    <Paper className={classes.paper}>
                        <UserInfo />
                        <div>
                            <hr className={classes.hrLight} />
                            <div className={classes.city}>
                                <span className={[classes.icon, classes.iconMap].join(' ')}></span><span style={{ marginLeft: 15 }}>{this.props.user.city}</span>
                            </div>
                            <hr className={classes.hrLight} />
                            <div className={classes.orders}>
                                <p className={classes.orderLabel}>MY ORDERS</p>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            Completed Orders
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.props.user.completedOrders}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            In Progress
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.props.user.inProgressOrders}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9} style={{ border: 'none', boxShadow: 'none' }}>
                    {orders.map(order => {
                        return <Paper key={order.id} className={classes.orderItem}>{this.renderOrders(order)}</Paper>;
                    })}
                </Grid>
                <RateCourier
                    open={this.state.openRate}
                    close={this.closeRate}
                    courier={this.state.ratedCourier}
                    owner={this.props.user.id}
                />
            </Grid>
        );
    }
}

CompletedOrders.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(CompletedOrders));