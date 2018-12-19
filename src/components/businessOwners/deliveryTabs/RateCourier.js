import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, TextField, Button } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import axios from 'axios';
import apiPath from '../../../services/apiPath';

const styles = theme => ({
    root: {
        color: '#707070',
    },
    title: {
        textAlign: 'center',
        '& *': {
            fontSize: 36,
            fontWeight: 100,
            color: '#707070',
        }

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
        marginRight: 10,
        width: 60,
        height: 60,
    },
    aboutCourier: {
        display: 'inline-block',
        marginLeft: 8,
        verticalAlign: 'middle',
        fontSize: 20,
    },
    defaultAvatar: {
        backgroundImage: `url(${defaultAvatar})`,
    },
    content: {
        textAlign: 'center',
        padding: 20,
    },
    starEmpty: {
        color: '#979797',
    },
    starFill: {
        color: '#EBF223',
    },
    rate: {
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
    },
    btn: {
        height: 42,
        width: 280,
        margin: 'auto',
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
});

const defaultAvatar = '/pictures/fakeData/poy_benbernanke.png';

class RateCourier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverRate: undefined,
            currentRate: 0,
            review: '',
        }
    }

    rate = () => {
        const {owner, courier} = this.props;
        const {currentRate, review} = this.state;
        axios.post(`${apiPath}business/writecourierreview/${courier.id}`,{
            businessOwnerID: owner,
            review: review,
            rating: ''+currentRate,
        }).then(
            this.setState({
                hoverRate: undefined,
                currentRate: 0,
                review: '',
            })
        )
        this.props.close();
    }

    rateHover = () => {
        const { classes } = this.props;
        const { hoverRate, currentRate } = this.state;

        let starsArray = [];
        for (let i = 0; i < 5; i++) {
            let star = <span style={{ verticalAlign: 'middle' }} key={i}
                onMouseEnter={() => this.setState({ hoverRate: i + 1 })}
                onClick={() => this.setState({ currentRate: i + 1 })}
                onMouseLeave={() => this.setState({ hoverRate: undefined })}
            >
                {(i < (hoverRate ? hoverRate : currentRate)) ?
                    <SvgIcon viewBox='0 0 15 15' className={classes.starFill} >
                        <path d="M27.641.52,25.688,4.48l-4.369.637A.957.957,0,0,0,20.79,6.75l3.161,3.08L23.2,14.181a.956.956,0,0,0,1.388,1.008L28.5,13.135l3.909,2.055A.957.957,0,0,0,33.8,14.181L33.048,9.83l3.161-3.08a.957.957,0,0,0-.529-1.633L31.311,4.48,29.358.52A.958.958,0,0,0,27.641.52Z" transform="translate(-20.5 0.013)" />
                    </SvgIcon> :
                    <SvgIcon viewBox='0 0 24 24' className={classes.starEmpty}>
                        <path style={{ transform: 'translate(-17px,6px)' }} d="M27.641.52,25.688,4.48l-4.369.637A.957.957,0,0,0,20.79,6.75l3.161,3.08L23.2,14.181a.956.956,0,0,0,1.388,1.008L28.5,13.135l3.909,2.055A.957.957,0,0,0,33.8,14.181L33.048,9.83l3.161-3.08a.957.957,0,0,0-.529-1.633L31.311,4.48,29.358.52A.958.958,0,0,0,27.641.52Z" transform="translate(-20.5 0.013)" />
                    </SvgIcon>
                }
            </span >

            starsArray.push(star);

        }
        return (
            <div className={classes.rate}>
                {starsArray}
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const {review} = this.state;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.close}
                aria-labelledby="form-dialog-title"
                className={classes.root}
            >
                <DialogTitle classes={{ root: classes.title }} id="form-dialog-title">RATE THIS COURIER</DialogTitle>
                <DialogContent className={classes.content}>
                    {this.props.courier ? <div >
                        {
                            this.props.courier.img ?
                                <div className={classes.avatar} style={{ backgroundImage: `url(${this.props.courier.img})` }} /> :
                                <div className={[classes.avatar, classes.defaultAvatar].join(' ')} />
                        }
                        <div className={classes.aboutCourier}>
                            <span style={{ margin: '5px 0', fontWeight: "bold" }}>{this.props.courier.name}</span>
                        </div>
                    </div> : ''}
                    {this.rateHover()}

                </DialogContent>
                <DialogContent className={classes.content}>
                        <TextField
                            value={review}
                            onInput={(event) => this.setState({review:event.target.value})}
                            label='Your Review'
                            variant='outlined'
                            multiline
                            rows={5}
                            fullWidth
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.rate} className={classes.btn}>
                        Rate
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

RateCourier.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RateCourier);