import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RateToStar from '../globalComponents/RateToStars';

const styles = theme => ({
    paper: {
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        borderRadius: 0,
    },
    root: {
        padding: 16,
        paddingTop: 50,
        margin: 0,
    },
    label: {
        display: 'flex',
        padding: 8,
        justifyContent: 'space-between',
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
        color: '#636363',
        fontWeight: 'bold',
    },
    icon1: {
        backgroundImage: "url('pictures/icons/partners/Group 374.png')",
    },
    icon2: {
        backgroundImage: "url('pictures/icons/partners/Group 375.png')",
    },
    icon3: {
        backgroundImage: "url('pictures/icons/partners/Group 373.png')",
    },
    iconMap: {
        backgroundImage: 'url("pictures/icons/partners/map-marker-alt.png")'
    },
    data: {
        fontSize: 15,
    },
    th10:{
        width: "10%",
        textAlign: "center"
        
    },
    th30:{
        width: "30%",
        textAlign: "center"
        
    },
    th70:{
        width: "70%",
        textAlign: "left",
        padding: 10
        
    },
    table:{
        padding: "5px"
    },
    user: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 5,
        alignItems: 'center',
        marginBottom: 40,
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

    },
    orders: {
        textAlign:'center',
    },
    orderLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#979797',
    },
    ordersType: {
        fontSize: 12,
        color: '#979797',
        margin:'25px auto',
    },
    ordersCount: {
        fontSize: 30,
        color: '#979797',
        fontWeight: 'bold',
        margin:'25px auto',
    },
    hrLight: {
        border: '0.5px solid #E9E9E9',
        margin: '25px auto',
        width: '80%'
    }
})

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = [
            {
                driverSno: 1.,
                driverName: "Mohammed Samy",
                driverRating: 5,
                driverPic:"#"
            },
            {
                driverSno: 2,
                driverName: "Naren",
                driverRating: 3.5,
                driverPic:"#"
            },
            {
                driverSno: 3,
                driverName: "Thapa",
                driverRating: 4,
                driverPic:"#"
            }
        ]
    }

    render() {
        const { classes, user } = this.props;
        const { driverSno, driverName, driverRating, driverPic } = this.state;

        return (
            <Grid container spacing={16} className={classes.root}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.paper}>
                        <hr />
                        <table className={classes.table}>
                        { this.state.map(function(v,i){ 
                            return(                      
                                <tr style={{height:85}}>
                                    <td className={classes.th10}>{v.driverSno}</td>
                                    <td className={classes.th10}><div className={classes.avatar}></div></td>
                                    <td className={classes.th70}>{v.driverName}</td>
                                    <td className={classes.th30}><RateToStar rate = {v.driverRating}/></td>
                                </tr>
                            );
                        })}
                        </table>
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