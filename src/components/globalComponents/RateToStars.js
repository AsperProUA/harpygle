import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    starEmpty: {
        color: '#979797',
    },
    starFill: {
        color: '#EBF223',
    },
    rate: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
});

function RateToStars(props) {
    const { classes, rate } = props;
    let starsArray = [];
    for (let i = 0; i < 5; i++) {
        if (i < rate) {
            starsArray.push(
                <SvgIcon key={i} className={classes.starFill}>
                    <path d="M27.641.52,25.688,4.48l-4.369.637A.957.957,0,0,0,20.79,6.75l3.161,3.08L23.2,14.181a.956.956,0,0,0,1.388,1.008L28.5,13.135l3.909,2.055A.957.957,0,0,0,33.8,14.181L33.048,9.83l3.161-3.08a.957.957,0,0,0-.529-1.633L31.311,4.48,29.358.52A.958.958,0,0,0,27.641.52Z" transform="translate(-20.5 0.013)" />
                </SvgIcon>
            );
        } else {
            starsArray.push(
                <SvgIcon key={i} className={classes.starEmpty}>
                    <path d="M27.641.52,25.688,4.48l-4.369.637A.957.957,0,0,0,20.79,6.75l3.161,3.08L23.2,14.181a.956.956,0,0,0,1.388,1.008L28.5,13.135l3.909,2.055A.957.957,0,0,0,33.8,14.181L33.048,9.83l3.161-3.08a.957.957,0,0,0-.529-1.633L31.311,4.48,29.358.52A.958.958,0,0,0,27.641.52Z" transform="translate(-20.5 0.013)" />
                </SvgIcon>
            );
        }
    }
    return (
        <div className={classes.rate}>
            {starsArray}
        </div>
    );
}

RateToStars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RateToStars);