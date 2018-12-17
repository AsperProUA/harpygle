import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
        height: '130px',
        backgroundColor: '#000000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function Header(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <img height={90} src='../Logo.png' alt='Logo'></img>
        </div>
    );
}

Headers.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header);