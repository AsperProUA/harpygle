import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import getData from '../../../services/getData';

import UserInfo from '../../globalComponents/UserInfo';

const fakeOrders = [
    {
        id: 1,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        quantity: 23,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
    },
    {
        id: 2,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        quantity: 5,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
    },
    {
        id: 3,
        photo: 'http://pngimg.com/uploads/smartphone/smartphone_PNG8523.png',
        name: 'HTC ONE  blue',
        description: 'Qualcomm® Snapdragon™ 810, ROM: 32GB / RAM: 3GB, 4G LTE,',
        quantity: 1,
        deliveryAddress: '85 Bd de La Liberté Benjdia, 20000 Casablanca',
    },
];

const styles = theme => ({
    item: {
        padding: '20px 5px',
    },
    photo: {
        border: '1px solid #CECECE',
        position: 'relative',
        width: 100,
        height: 100,
        padding: 5,
        textAlign: 'center',
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
        }
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
    data: {
        [theme.breakpoints.down('sm')]: {
            padding: 4,
        }
    },
    numberInput: {
        minWidth: 33,
    },
    user: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 5,
        alignItems: 'center',
        marginBottom: 40,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '0 20px',
        color: '#636363'
    },
    city: {
        fontSize: 18,
        color: '#979797',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 400,
    },
    hrLight: {
        border: '0.5px solid #E9E9E9',
        margin: '20px auto',
        width: '80%'
    },
    iconReplace: {
        backgroundImage: 'url("pictures/icons/business/exchange-alt.png")'
    },
    iconShopify:{
        backgroundImage:'url("/pictures/icons/preview.png")'
    },
    icon: {
        width: 32,
        height: 32,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    userBadge: {
        [theme.breakpoints.up('sm')]: {
            order: 5,
        },
    },
    paper: {
        padding: 15,
    },
    button: {
        backgroundColor: '#25AAE1',
        color: 'white',
        height: 50,
        '&:hover': { backgroundColor: '#2097C8' },
    },
    shopify: {
        fontSize: 16,
    },
    shopifyUrl:{
        textAlign:'left',
        color: '#979797',
        fontSize: '20',
    },
})

class ReplacedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: fakeOrders,
            user: {
                ShopifyURL: 'https://egypt.souq.com/',
            },
        }
    }

    componentDidMount() {
        getData({ url: `replaced-orders/${this.props.user.id}` })
    }

    render() {
        const { orders } = this.state;
        const { classes, user } = this.props;
        console.log(orders);
        return (
            <Grid container spacing={0} style={{marginTop: 20}}>
                <Grid item sm={4} xs={12} md={4} lg={3} className={classes.userBadge}>
                    <Paper className={classes.paper}>
                        <UserInfo />
                        <div>
                            <hr className={classes.hrLight} />
                            <div className={classes.shopifyUrl}>
                                <div className={classes.shopify}><span><span className={[classes.icon, classes.iconShopify].join(' ')}/> Shopify URL </span></div>
                                {this.state.user.ShopifyURL}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={9}>
                    <Paper>
                        {orders.map(order => {
                            return (
                                <Paper key={order.id}>
                                    <Grid container className={classes.item} >

                                        <Grid item xs={12} sm={12} md={4} lg={3} xl={2} className={classes.data}><div className={classes.photo}>

                                            <img src={order.photo}></img>
                                            <div className={classes.quantity}><span className={classes.x}>X</span>{order.quantity}</div>
                                        </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={6} xl={8} className={classes.td}>
                                            {order.name}
                                            <br />
                                            {order.description}
                                            <br />
                                            <span className={[classes.icon, classes.iconMap].join(' ')}></span>
                                            <span >{order.deliveryAddress}</span>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={3} xl={2} item className={classes.td}>
                                            <Button className={classes.button}><span className={[classes.icon, classes.iconReplace].join(' ')}></span>REPLACE CLIENT</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            );
                        })}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

ReplacedOrders.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(ReplacedOrders));