import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Avatar from './Avatar';

const styles = theme => ({
    verified: {
        fontSize: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 400,
    },
    icon: {
        width: 32,
        height: 32,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
        backgroundImage: "url('pictures/icons/business/check-circle.png')",
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '0 20px',
    },
    user: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 5,
        alignItems: 'center',
        marginBottom: 40,
        color: '#979797',
    },
});

function Verfied(props) {
    const { classes, user } = props;
    return (
        <div className={classes.user}>
            <Avatar size={60} />
            <div className={classes.name}>
                <span >{user.name}</span>
                <br />
                {
                    user.isVerified &&
                    <span className={classes.verified}>
                        <span className={classes.icon}></span><span style={{ marginLeft: 15 }}>Verfied</span>
                    </span>
                }

            </div>
        </div>
    );
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(Verfied))