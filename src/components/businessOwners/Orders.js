import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root:{
        width: '100%',
        height: 'calc(100% - 100px)',
        textAlign: 'center',
    },
    btn:{
        top:'40vh',
        backgroundColor: '#25AAE1',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        '&:hover': { backgroundColor: '#2097C8' },
        margin:'auto',
        width: 382,
        height: 66,
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
    }
});

function Orders(props){
    const {classes} = props;
    return(
        <div className={classes.root}>
            <Button className={classes.btn}>CONNECT YOUR STORE</Button>
        </div>
    );
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Orders);