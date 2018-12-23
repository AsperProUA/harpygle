import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import classnames from '@material-ui/core/node_modules/classnames'
import Avatar from '../globalComponents/Avatar';

import RateToStars from '../globalComponents/RateToStars';
import UserInfo from '../globalComponents/UserInfo';


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
        owner: {
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
        owner: {
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
        owner: {
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
        owner: {
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
    owner: {
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
    aboutOwner: {
        display: 'inline-block',
        marginLeft: 8,
        verticalAlign: 'middle',
        fontSize: 20,
    },
    btn: {
        height: 50,
        width: 200,
        margin: 'auto',
        alignSelf: 'center',
        color: theme.palette.common.white,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: 10,
        },
        margin: 30,
    },
    btnAccept: {
        backgroundColor: '#88C601',
        '&:hover': { backgroundColor: '#7BB203' },
    },
    btnHide: {
        backgroundColor: '#CECECE',
        '&:hover': { backgroundColor: '#BFBEBE' },
    },
    btnLine: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    driver: {
        fontSize: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 400,
    },
    icon: {
        width: 32,
        height: 32,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
        backgroundImage: "url('pictures/icons/courier/Layer_3.png')",
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '0 20px',
    },
    user: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 5,
        alignItems: 'center',
        marginBottom: 40,
        color: '#979797',
    },
    info: {
        color: '#979797',
        textAlign: 'center',
    }
})

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

class TaskFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: fakeOrders,
        }
    }

    componentDidMount() {
        // fetch orders & set state;
    }

    closeRate = () => {
        this.setState({ openRate: false });
    }

    renderOrders = (order) => {
        const { classes, user } = this.props;
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
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} className={classes.owner}>
                    <div >
                        {
                            order.owner.img ?
                                <div className={classes.avatar} style={{ backgroundImage: `url(${order.owner.img})` }} /> :
                                <div className={[classes.avatar, classes.defaultAvatar].join(' ')} />
                        }
                        <div className={classes.aboutOwner}>
                            <span style={{ margin: '5px 0', fontWeight: "bold" }}>{order.owner.name}</span><br />
                            <span>{order.owner.completed}Completed Orders</span>
                            <RateToStars rate={order.owner.rate} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.btnLine}>
                    <Button onClick={() => this.accept()} className={classnames(classes.btn, classes.btnAccept)}>ACCEPT</Button>
                    <Button className={classnames(classes.btn, classes.btnHide)}>HIDE</Button>
                </Grid>
            </Grid >
        );
    }

    render() {
        const { orders } = this.state;
        const { classes, user } = this.props;
        return (
            <Grid container spacing={0} >
                <Grid item sm={12} xs={12} md={4} lg={3} className={classes.userBadge}>
                    <Paper className={classes.paper}>
                        <div className={classes.user}>
                            <Avatar size={60} />
                            <div className={classes.name}>
                                <span >{user.name}</span>
                                <br />
                                <span className={classes.driver}>
                                    <span className={classes.icon}></span><span style={{ marginLeft: 15 }}>Driver</span>
                                </span>
                            </div>
                        </div>
                        <hr className={classes.hrLight} />
                        <div className={classes.info}>
                            {user.companyName &&
                                <p style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    {user.companyName}
                                </p>
                            }
                            <p style={{ fontSize: 16 }}>
                                <span style={{ fontWeight: 'bold' }}>{user.completedOrders}</span> Completed Orders
                            </p>
                            <div className={classes.info}>
                                <p style={{fontWeight: 'bold', fontSize: 20
                                }}>MY CITIES</p>
                                <div>

                                </div>

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

TaskFeed.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(TaskFeed));