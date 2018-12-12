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

function Thanks(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <Header/>
            <h2>
                Thank you!
            </h2>
            <p>
                Your are successfully registered.
            </p>
            <p>Please login to enter to the dashboard.</p>
            <Link to={'../signin'}>
                SIGN IN
            </Link>
        </div>
    );
}

Thanks.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Thanks);