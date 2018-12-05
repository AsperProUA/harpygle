import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from './Header';

const style = theme => ({
    root: {
        width: '100%',
        height: '100vh',
    },
    body: {
        position: 'relative',
        padding: '0 50px',
        paddingTop: '90px',
        minHeight: 'calc(100% - 130px)',
        width: '100%',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            padding: '10px',
            paddingTop: '5px',
        },
    },
    item: {
        padding: '0 35px',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            margin: 'auto',
        },
        height: '100%',
    },
    paper: {
        border: 'none',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
        borderRadius: 0,
        padding: '68px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '10px',
            marginBottom: '20px',
            minWidth: '210px',
        },
        whiteSpace: 'nowrap',
        '& div': {
            width: '164px',
            height: '164px',
            margin: 'auto',
        },
        '& button': {
            backgroundColor: '#88C601',
            color: theme.palette.common.white,
            margin: '37px 0',
            width: 250,
            '&:hover': {
                backgroundColor: '#7BB203',
            }
        },
        '& a': {
            textDecoration: 'none',

        }
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#707070',
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#979797',
    },
    modalBg: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

class PreSignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            currentRegistered: null,
        }
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Header />
                <Grid container alignContent='space-around' className={classes.body}>
                    <Grid item md={4} className={classes.item}>
                        <Paper className={classes.paper}>
                            <div>
                                <img width={164} src='./pictures/Intro/undraw_credit_card_df1m.png'></img>
                            </div>
                            <p className={classes.label}>
                                BUSINESS OWNER
                        </p>
                            <p className={classes.description}>Cash Settlement</p>
                            <p className={classes.description}>Delivery</p>
                            <p className={classes.description}>Pick Up</p>
                            <Link to='owner/signup'>
                                <Button>GET STARTED</Button>
                            </Link>
                            <br />
                            <Link to='/about'>LEARN MORE</Link>
                        </Paper>
                    </Grid>
                    <Grid item md={4} className={classes.item}>
                        <Paper className={classes.paper}>
                            <div>
                                <img width={164} src='./pictures/Intro/Mask Group 1.png'></img>
                            </div>
                            <p className={classes.label}>
                                COURIER
                        </p>
                            <p className={classes.description}>Be Your Own Boss</p>
                            <p className={classes.description}>Make Your Own Money</p>
                            <p className={classes.description}>Control Your Own Life</p>
                            <Link to='courier/signup'>
                                <Button>GET STARTED</Button>
                            </Link>
                            <br />
                            <Link to='/about'>LEARN MORE</Link>
                        </Paper>
                    </Grid>
                    <Grid item md={4} className={classes.item}>
                        <Paper className={classes.paper}>
                            <div>
                                <img width={164} src='./pictures/Intro/undraw_Container_ship_urt4 (1).png'></img>
                            </div>
                            <p className={classes.label}>
                                SUPPLIERS
                        </p>
                            <p className={classes.description}>Verified Suppliers</p>
                            <p className={classes.description}>Easy Live Quotes </p>
                            <p className={classes.description}>Delivery</p>
                            <Link to='supplier/signup'>
                                <Button>GET STARTED</Button>
                            </Link>
                            <br />
                            <Link to='/about'>LEARN MORE</Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

PreSignUp.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(PreSignUp);