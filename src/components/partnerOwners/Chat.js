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

class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        const { classes } = this.props;
        const { email } = this.props.user;
        return (
            <div className={classes.root}>
                chat
            </div>
        );
    }
}

Chats.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Chats));