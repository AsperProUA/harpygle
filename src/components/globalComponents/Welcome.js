import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
})

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        console.log(this.props)
        const { classes, user } = this.props;
        return (
            <div className={classes.root}>
                <h1> Welcome Back , <h1 className="breakWord">{user.email}</h1></h1>
            </div>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Welcome));