import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RateToStar from '../globalComponents/RateToStars';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    paper: {
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        borderRadius: 0,
    },
    root: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
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
        textAlign: "left"
        
    },
    th30:{
        width: "27%",
        textAlign: "left"
        
    },
    th60:{
        width: "58%",
        textAlign: "left"        
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
    },
    size: {
        fontSize : 40
    }
})

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

class Team extends Component {
    constructor(props) {
        super(props);
        /// ////////////////  Fake Data  ////////////////////////////
        this.state = [
            {
                driverSno: 1.,
                driverName: "Mohammed",
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
            },
            {
                driverSno: 4,
                driverName: "Mohit",
                driverRating: 2.5,
                driverPic:"#"
            },
            {
                driverSno: 5,
                driverName: "Jatin",
                driverRating: 1.5,
                driverPic:"#"
            }
        ]
        ///////////////////////////////////////////////////////////////
    }
    listByCategory() {
        console.log('hello');

    }
    

    render() {
        const { classes, user } = this.props;
        const { driverSno, driverName, driverRating, driverPic } = this.state;

        return (
            <Grid container spacing={16} className={classes.root}>
                <Grid item lg={10} md={10} sm={10} xs={12}>
                    <Paper className={classes.paper}>
                        <hr />
                        <h4><img src={require('../../assets/icon/people.png')} /> Your Team Members <img class='cusor' onClick={() => this.listByCategory()} src={require('../../assets/icon/listing.png')}/><img class='right' src={require('../../assets/icon/groupAdd.png')}></img></h4>
                        <table className={classes.table}>
                        { this.state.map(function(v){ 
                            return(                      
                                <tr class="tableRow">
                                    <td class="cell"><div className={[classes.avatar, classes.defaultAvatar].join(' ')}></div></td>
                                    <td className={classes.th60}><span>{v.driverName}</span><span class="teamName"><RateToStar rate = {v.driverRating}/></span></td>
                                    <td className={classes.th30}><span class="teamName"><img class='imgTool' src={require('../../assets/icon/chatIcon.png')} /> Chat With {v.driverName}</span></td>
                                    <td className={classes.th30}><Icon>delete</Icon><span class="teamName" id={v.driverSno}> Remove</span></td>

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

Team.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Team));