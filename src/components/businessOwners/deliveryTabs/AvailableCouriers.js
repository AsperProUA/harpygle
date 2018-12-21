import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import RateToStars from '../../globalComponents/RateToStars';
import getData from '../../../services/getData';

///////////////////////////////////////////////////////////////////////
// fake data
const fakeCouriers = [
    {
        id: 1,
        name: 'Mohammed Samy',
        rate: 3,
        completedOrders: 20,
    },
    {
        id: 2,
        name: 'Alex',
        rate: 2,
        completedOrders: 11,
        avatar:'http://pngimg.com/uploads/face/face_PNG5642.png',
    },
    {
        id: 3,
        name: 'Max',
        rate: 3,
        completedOrders: 16,
        avatar:'http://pngimg.com/uploads/face/face_PNG5645.png',
    },
    {
        id: 4,
        name: 'George',
        rate: 5,
        completedOrders: 62,
        avatar:'http://pngimg.com/uploads/face/face_PNG5644.png',
    },
    {
        id: 5,
        name: 'Michael',
        rate: 4,
        completedOrders: 23,
        avatar:'http://pngimg.com/uploads/face/face_PNG5643.png',
    },
    {
        id: 6,
        name: 'Sam',
        rate: 1,
        completedOrders: 1,
        avatar:'http://pngimg.com/uploads/face/face_PNG5651.png',
    },
];
///////////////////////////////////////////////////////////////////////

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

const styles = theme => ({
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
    completedOrders:{
        margin:'55px auto',
    }
});

class AvaliableCouriers extends Component {
    constructor(props) {
        super(props);
        this.state ={
            couriers: fakeCouriers,
        }
    }

    componentDidMount(){
        getData({url: 'courier/getallcourier'}).then(response => {
            this.setState({couriers: response.data.response});
            response.data.response.forEach((courier, i) => {
                getData({url: `courier/getbyid/${courier.courierID}`}).then(response => {
                    this.setState(state => {
                        state.couriers[i] = response.data.response;
                        return state;
                    });
                })
            })
        });
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
                                {courier.completedOrders || 0} <span style={{fontWeight:400}}> Completed orders</span>
                            </div>
                        </div>
                        <CardActions style={{ textAlign: 'center' }}>
                            <Button className={classes.cardButton}>Select {courier.name}</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        const { couriers } = this.state;
        return (
            <div className={classes.root}>
                <h2 className={classes.label}>Available Couriers To Deliver Your Order</h2>
                <Grid container spacing={24} style={{ maxWidth: '100%', margin: 'auto', padding: 10 }}>
                    {couriers.map(courier => {
                        return this.renderCourier(courier);
                    })}
                </Grid>
            </div>
        );
    }
}



AvaliableCouriers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvaliableCouriers);