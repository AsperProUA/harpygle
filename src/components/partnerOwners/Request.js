import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RateToStars from '../globalComponents/RateToStars';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckIcon from '@material-ui/icons/CheckCircle';
import getData from '../../services/getData';
import '../../css/bootstrap.css';
import '../../css/partnerRequest.css';

///////////////////////////////////////////////////////////////////////
// fake data
const fakeOrders = [
    {
        id: 1,
        qty: 1,
        itemName: 'Honor 7s Dual SIM',
        itemDescription: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        from: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        to: '85 Bd Anfa, Gauthier, 20000 Casablanca, Morocco',
        name: 'Mohammed Samy',
        completedOrders: '201 Completed Orders',
        rate: 4,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
        isAssigned: false
    },
    {
        id: 2,
        qty: 1,
        itemName: 'Honor 7s Dual SIM',
        itemDescription: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        from: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        to: '85 Bd Anfa, Gauthier, 20000 Casablanca, Morocco',
        name: 'Mohammed Samy',
        completedOrders: '201 Completed Orders',
        rate: 4,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
        isAssigned: true
    },
    {
        id: 3,
        qty: 1,
        itemName: 'Honor 7s Dual SIM',
        itemDescription: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        from: '83/85 Bd de La Liberté Benjdia, 20000 Casablanca',
        to: '85 Bd Anfa, Gauthier, 20000 Casablanca, Morocco',
        name: 'Mohammed Samy',
        completedOrders: '201 Completed Orders',
        rate: 4,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
        isAssigned: false
    },
];

const fakeCouriers = [
    {
        id: 1,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
    },
    {
        id: 2,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
    },
    {
        id: 3,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
    },
    {
        id: 4,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
    },
    {
        id: 5,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
    },
    {
        id: 6,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
        avatar: '../../assets/icon/item_XL_27456702_66740328.png',
    },
];
///////////////////////////////////////////////////////////////////////
const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

const styles = theme => ({
    assignButton: {
        margin: 'auto',
        width: 150,
        height: 40,
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        '&:hover': { backgroundColor: '#7BB203' },
    },
    hideButton: {
        margin: 'auto',
        width: 150,
        height: 40,
        backgroundColor: '#cecece',
        color: theme.palette.common.white,
    },
    root: {
        color: '#979797',
        textAlign: 'center',
    },
    label: {
        fontSize: 36,
        margin: '8px auto',
        [theme.breakpoints.down('md')]: {
            fontSize: 21
        },
        textAlign: 'center',
    },
    cardButton: {
        margin: 'auto',
        width: 303,
        height: 60,
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        '&:hover': { backgroundColor: '#7BB203' },
    },
    avatar: {
        display: 'inline-block',
        width: 60,
        height: 60,
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: 10,
    },
    defaultAvatar: {
        backgroundImage: `url(${defaultAvatar})`,
    },
    aboutCourier: {
        display: 'inline-block',
        marginLeft: 8,
        verticalAlign: 'middle',
        fontSize: 20,
        fontWeight: 'bold',
    },
    completedOrders: {
        paddingTop: 20,
        textAlign: 'center',
        fontWeight: 600,
        borderTop: '1px solid gainsboro'
    },
    chatRow : {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },
    removeImgText: {
        color: '#88C601',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        '& svg': { marginRight: 10 },
    },
});
class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: fakeOrders,
            couriers: fakeCouriers,
            page: 1,
            isAssigned: false,
        }
        this.changePagetoSecond = this.changePagetoSecond.bind(this);
        this.changePagetoFirst = this.changePagetoFirst.bind(this);
    }
    changePagetoSecond() {
        this.setState({
            page: 2,
        })
    }

    changePagetoFirst() {
        this.setState({
            page: 1,
        })
    }

    renderOrders = (order) => {
        const { classes } = this.props;
        if(order.isAssigned) {
            var checkIcon = <span className={classes.removeImgText}><CheckIcon /></span>;
        }
        else {
            var checkIcon = '';
        }
        return (
            <div key={order.id} className="row my-4 justify-content-center">
                <div className="col-lg-7 col-11 d-flex">
                    <span className="itemImageDiv">
                        <img src={require("../../assets/icon/item_XL_27456702_66740328.png")} />
                        <span className="qtyPosition">
                            <span className="crossFont">x</span>
                            <span className="qtyFont">{order.qty}</span>
                        </span>
                    </span>
                    <span className="itemDescriptionFont">
                        <p className="mb-0">{order.itemName}</p>
                        <p>{order.itemDescription}</p>
                        <p className="mb-0"><b className="pr-3">From</b>{order.from}</p>
                        <p className="mb-0"><b className="pr-5">To</b>{order.to}</p>
                    </span>
                </div>
                <div className="col-lg-4 col-11 d-flex">
                    <div>
                        <img src={require("../../assets/icon/poy_benbernanke.png")} />
                    </div>
                    <div className="pl-2">
                        <b style={{ margin: '5px 0' }}>{order.name}</b>
                        <div>{order.completedOrders}</div>
                        <RateToStars rate={order.rate} />
                    </div>
                </div>
                <div className="col-11 btnRowBackground">
                    <span>
                        <Button className={classes.assignButton} onClick={()=>this.changePagetoSecond()}>Assign</Button>
                        {checkIcon}
                    </span>
                    <span className="float-right"><Button className={classes.hideButton}>Hide</Button></span>
                </div>
            </div>
        );
    }

    renderCourier = (courier) => {
        const { classes } = this.props;
        return (
            <Grid key={courier.id} item lg={4} sm={6} xs={12} >
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            {
                                courier.avatar ?
                                    <div className={classes.avatar} style={{ backgroundImage: `url(${courier.avatar})` }} /> :
                                    <div className={[classes.avatar, classes.defaultAvatar].join(' ')} />
                            }
                            <div className={classes.aboutCourier}>
                                <span style={{ margin: '5px 0' }}>{courier.name}</span>
                                <RateToStars rate={courier.rate} />
                            </div>
                            <div className={classes.completedOrders}>
                                {courier.completedOrders} <span style={{ fontWeight: 400 }}> Completed orders</span>
                            </div>
                            <div className={classes.chatRow}>
                                <img style={{paddingRight: 15}} src={require("../../assets/icon/chatIcon.png")} />
                                Chat with <b>{courier.name}</b>
                            </div>
                        </div>
                        <CardActions style={{ textAlign: 'center' }}>
                            <Button className={classes.cardButton} onClick={() => this.changePagetoFirst()}>Select {courier.name}</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {
        const { orders, couriers, page } = this.state;
        const { classes } = this.props;
        if(page === 1){
            return (
                <div className="container">
                    <div className="row">
                        <ul className="nav">
                            <li className="nav-item">
                                <img src={require("../../assets/icon/iconfinder_Task_1737367.png")} />
                                <span className="headText blackFont">Tasks Feed</span>
                            </li>
                            <li className="nav-item">
                                <img src={require("../../assets/icon/hourglass-half.png")} />
                                <span className="headText">In Progress Orders</span>
                            </li>
                            <li className="nav-item">
                                <img src={require("../../assets/icon/check.png")} />
                                <span className="headText">Completed Orders</span>
                            </li>
                        </ul>
                    </div>
                    {orders.map(order => {
                        return this.renderOrders(order);
                    })}
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <h2 className={classes.label}>Choose Courier</h2>
                    <Grid container spacing={24} style={{ maxWidth: '100%', margin: 'auto', padding: 10 }}>
                        {couriers.map(courier => {
                            return this.renderCourier(courier);
                        })}
                    </Grid>
                </div>
            );
        }
       
    }
}

Request.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Request));