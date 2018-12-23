import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';

const style = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 600,
        color: '#979797',
        '& a':{
            textDecoration: 'none',
        }

    }
});

function ThanksPasswordChange(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <Header/>
            <h2>
                Thank you!
            </h2>
            <p>
            The password for your Harpygle account has been successfully changed.
            </p>
            <p>Please login to enter to the dashboard.</p>
            <Link to={'../signin'}>
                SIGN IN
            </Link>
        </div>
    );
}

ThanksPasswordChange.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(ThanksPasswordChange);