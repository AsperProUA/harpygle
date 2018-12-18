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
        date: '23 November, 10:00 AM',
        courier: {
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
        date: '23 November, 10:00 AM',
        courier: {
            name: 'Oleh',
            img: '',
            rate: 4,
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
        date: '23 November, 10:00 AM',
        courier: {
            name: 'Igor',
            img: '',
            rate: 4,
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
        date: '23 November, 10:00 AM',
        courier: {
            name: 'Mohamed',
            img: '',
            rate: 4,
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
    },
    courier: {
        display: 'flex',
    },
    connectorLine: {
        width: '110%',
        position: 'relative',
        left: -10,
        padding: 10,
        left: -15,
        borderTopWidth: 4,
        zIndex: 0
    },
    iconActive: {
        backgroundColor: "#88C601!important",
    },
    iconRoot: {
        position: 'relative',
        top: -4,
        zIndex: 25,
        width: 29,
        height: 29,
        border:'3px solid white',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CECECE',
        boxShadow: '0px 1px 6px rgba(0,0,0,0.3)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // iconContainer: {
    //     position: 'relative',
    //     '&:before': {
    //         content: "' '",
    //         zIndex: 24,
    //         position: 'absolute',
    //         width: 35,
    //         height: 35,
    //         top: -6,
    //         left: -6,
    //         backgroundColor: 'white',
    //         borderRadius: '50%',
    //         border: '1px solid rgba(0,0,0,0.5)'
    //     }
    // },
    photo: {
        border:'1px solid #CECECE',
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
        top: 60,
        left: 85,
    },
    x: {
        fontSize: 30,
        color: '#CECECE',
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    }
})

const steps = [
    'Order Received',
    'On My Way',
    'Delivered',
    'Paid',
]

function renderCustomIcon(props) {
    console.log(props)
    const { classes, icon ,active, completed } = props;
    console.log()
    return (<span
        className={classNames(classes.iconRoot, {
            [classes.iconActive]: active||completed,
        })}
    >{icon}</span>)
}

const CustomIcon = withStyles(styles)(renderCustomIcon);

class InProgress extends Component {
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
        const { classes } = this.props;
        const connector = (
            <StepConnector
                classes={{
                    line: classes.connectorLine,
                }}
            />);
        return (
            <Grid container key={order.id}>
                <Grid item sm={12} md={3} className={classes.productInfo}>
                    <div className={classes.courier}>
                        <div
                            style={{ width: 60, height: 60, backgroundImage: (`url(${order.courier.img})`), }}
                            className={classes.avatar}
                        />
                        <div>
                            <p>Order By</p>
                            <p>{order.courier.name}</p>
                            <RateToStars rate={order.courier.rate} />
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={9} className={classes.priceBox}>
                    <Stepper activeStep={order.stage} alternativeLabel connector={connector}>
                        {steps.map((label, i) => {
                            return (
                                <Step key={label}>
                                    <StepLabel 
                                        StepIconComponent={CustomIcon}
                                        classes={{
                                            iconContainer: classes.iconContainer,
                                        }}
                                    >{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={12} md={7} className={classes.productInfo}>
                    <div className={classes.photo}>
                        <img src={order.photo}></img>
                        <div className={classes.quantity}><span className={classes.x}>X</span>{order.quantity}</div>
                    </div>
                    <div>
                        <p>{order.name}</p>
                        <p>{order.description}</p>
                        <p><span className={[classes.icon, classes.iconMap].join(' ')}></span>{order.deliveryAddress}</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5} className={classes.button}>
                    {order.completed ? (
                        <Button style={{ backgroundColor: '#88C601', color: 'white', }}> ATTACH DEPOSIT RECEIPT</Button>
                    ) : (
                            <Button style={{ backgroundColor: '#25AAE1', color: 'white', }}>CHANGE STATUS</Button>
                        )}
                </Grid>
            </Grid>
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
                                <span className={[classes.icon, classes.iconMap].join(' ')}></span><span style={{ marginLeft: 15 }}>{this.state.user.city}</span>
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
                                            {this.state.user.completedOrders}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            In Progress
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
                <Grid item xs={12} sm={12} md={8} lg={9} style={{ border: 'none', boxShadow: 'none' }}>
                    {orders.map(order => {
                        return <Paper key={order.id} className={classes.orderItem}>{this.renderOrders(order)}</Paper>;
                    })}
                </Grid>
            </Grid>
        );
    }
}

InProgress.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(InProgress));