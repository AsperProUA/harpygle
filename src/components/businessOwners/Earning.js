import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import getData from '../../services/getData';

const styles = theme => ({
    root: {
        margin: 'auto',
        color: '#979797',
        width: 494,
        padding: 30,
        boxSizing: 'border-box',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
    },
    label: {
        fontSize: 36,
    },
    between: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    secondary: {
        fontSize: 14,
        color: '#CECECE',
    },
    dataField: {
        display: 'flex',
        margin: '20px 0'
    },
    mainData: {
        flex: '1 1 70%', textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
    },
    secondaryLabel: { flex: '1 1 30%', textAlign: 'left' },
    hr: {
        border: '0.5px solid #CECECE',
        height: 0,
    },
    defaultLink: {
        color: '#25AAE1',
        textDecoration: 'none',
    },
    btn: {
        width: 260,
        height: 60,
        margin: '30px 0',
        marginBottom: 50,
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
    }
})

class Earnings extends Component {
    constructor(props) {
        super(props);

        

        this.state = {
            totalEarnings: 200,
            swiftCode: 'AAAA BB CC DDD',
            accountNumber: '0123456789',
        }
        

        ////////////////////////////////////////////////////////////////
        // need remake when backend will be ready
        getData({url: 'business/earnings' /* + id*/}).then(data => {
            this.setState(currentState => {
                data.totalEarnings && (currentState.totalEarnings = data.totalEarnings);
                data.swiftCode && (currentState.swiftCode = data.swiftCode);
                data.accountNumber && (currentState.accountNumber = data.accountNumber);
                return currentState;
            });
        });
        ////////////////////////////////////////////////////////////////


    }

    render() {
        const { classes } = this.props;
        const { email } = this.props.user;
        const { totalEarnings, accountNumber, swiftCode } = this.state;
        return (
            <div className={classes.root}>
                <p className={classes.label}>You earnings</p>
                <div style={{boxShadow: '0 3px 6px rgba(0,0,0,0.16)',}}>
                    <p style={{ fontSize: 18 }}>Your Total Earnign</p>
                    <p style={{ fontSize: 40, margin: '0 auto', fontWeight: 'bold' }}>{totalEarnings} <span style={{ fontSize: 24 }}> MAD</span></p>
                    <div>
                        <div className={classes.between}><span> Paypal </span><span className={classes.secondary}>Default</span></div>
                        <div className={classes.dataField}>
                            <div className={[classes.secondaryLabel, classes.secondary].join(' ')}>Email</div>
                            <div className={classes.mainData}>{email}</div>
                        </div>
                    </div>
                    <hr className={classes.hr} />
                    <div>
                        <div className={classes.between}><span> Wire Transfer </span><Link className={classes.defaultLink} to='/makedefault'>Make Default </Link></div>
                        <div className={classes.dataField}>
                            <div className={[classes.secondaryLabel, classes.secondary].join(' ')}>Swift Code</div>
                            <div className={classes.mainData}>{swiftCode}</div>
                        </div>
                        <div className={classes.dataField}>
                            <div className={[classes.secondaryLabel, classes.secondary].join(' ')}>Account Number</div>
                            <div className={classes.mainData}>{accountNumber}</div>
                        </div>
                    </div>
                    <hr className={classes.hr} />
                    <div>
                        <div className={classes.between}><span> Payoneer </span><Link className={classes.defaultLink} to='/makedefault'>Make Default</Link></div>
                        <div className={classes.dataField}>
                            <div className={[classes.secondaryLabel, classes.secondary].join(' ')}>Email</div>
                            <div className={classes.mainData}>{email}</div>
                        </div>
                    </div>
                    <hr className={classes.hr} />
                    <Button className={classes.btn} type='submit'>GET PAID NOW</Button>
                </div>
            </div>
        );
    }
}

Earnings.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Earnings));