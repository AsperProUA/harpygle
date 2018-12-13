import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const defaultAvatar = 'pictures/poy_benbernanke.png';

const styles = theme => ({
    dotOnline: {
        backgroundColor: '#88C601',
    },
    dotOffline: {
        backgroundColor: '#FFD013',
    },
    avatar: {
        display: 'inline-block',
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative',
        '& span': {
            position: 'absolute',
            top: '72%',
            left: '72%',
            borderRadius: '50%',
            width: 11,
            height: 11,
        },
    }
});

function Avatar(props) {
    const { size, avatar, online, classes } = props;
    
    return (
        <div
            style={{ width: size, height: size, backgroundImage: (avatar ? `url(${avatar})` : `url(${defaultAvatar})`), }}
            className={classes.avatar}
        >
            {(online !== undefined) && <span className={online ? classes.dotOnline : classes.dotOffline} />}
        </div>
    );
}

const StyledAvatar = withStyles(styles)(connect(
    state => ({
        avatar: state.loginData.user.avatar,
    })
)(Avatar));


export default StyledAvatar;