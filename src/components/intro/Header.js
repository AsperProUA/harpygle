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
            <Link to='/'>
                <img height={90} width='auto' src={'/logo.png'} alt='Logo'></img>
            </Link>
        </div>
    );
}

Headers.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header);