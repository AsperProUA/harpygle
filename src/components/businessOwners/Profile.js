import axios from 'axios';
import apiPath from '../../services/apiPath';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/CheckCircle';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import getData from '../../services/getData';
import logOut from '../../services/logOut';

const style = theme => ({
    avatar: {
        width: 101,
        height: 101,
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
        '& button': {
            width: 214,
            height: 60,
            margin: '20px 0',
            backgroundColor: '#88C601',
            color: theme.palette.common.white,
            '& svg': { marginRight: 10 },
            '&:hover': { backgroundColor: '#7BB203' },

        },
        '&.secondaryBtn': {
            backgroundColor: 'inherit',
        },
    },
    removeImgText: {
        color: '#88C601',
        display: 'flex',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        '& svg': { marginRight: 10 },
    },
    secondaryText: {
        color: '#979797',
        fontSize: 18,
        fontWeight: 'bold',
    },
    shopify: {
        display: 'flex',
        width: 280,
        justifyContent: 'space-between',
        fontSize: 16,
        marginBottom: 16,
    },
    accountId: {
        display: 'flex',
        width: 280,
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        padding: '20px',
    },
    url: {
        width: 280,
        padding: '35px 20px',
        textAlign: 'left',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
    },
    formGroup: {
        width: 320,
        margin: 'auto',
        textAlign: 'left',
        padding: '35px 0',
    },
    submitBtn: {
        width: 214,
        height: 60,
        margin: '20px 0',
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
    },
    defaultAvatar: {
        backgroundImage: `url(${defaultAvatar})`,
    },
    fileUpload: {
        position: 'relative',
        overflow: 'hidden',
        '& input': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            transform: 'scale(20)',
            opacity: 0,
            cursor: 'pointer',
        }
    },
});

const defaultAvatar = 'pictures/poy_benbernanke.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                avatar: {
                    updated: false,
                    value: null,
                },
                email: {
                    value: '',
                    isValid: false,
                    errMsg: 'invalid email',
                },
                password: {
                    value: '',
                    isValid: false,
                    errMsg: 'password is too short',
                },
                passwordRepeat: {
                    value: '',
                    isValid: false,
                    errMsg: 'passwords are not equal',
                },
                name: { value: '', },
                city: { value: '', },
                phoneNum: { value: '', },
                pickupAddress: { value: '', },
                ShopifyURL: 'https://egypt.souq.com/',

            },
            isValid: false,
            isChecked: false,
        }
        this.fetchOwner();
    }

    fetchOwner = () => {
        getData({ url: `business/get/${this.props.loginData.user.id}` })
            .then(response => {

                const { ownerID, name, city, phoneNum, email, pickupAddress, pictureUrl } = response.data;
                this.setState(currentState => {
                    const { user } = currentState;
                    user.id = ownerID;
                    user.name.value = name;
                    user.city.value = city;
                    user.phoneNum.value = phoneNum;
                    user.email.value = email;
                    user.pickupAddress.value = pickupAddress;
                    user.avatar.value = pictureUrl;
                    return currentState;
                });
            });

    }

    handleInput = (name, value) => {

        this.setState(currentState => {
            currentState.user[name].value = value;
            return currentState;
        });

    }

    updateOwner = (e) => {
        e && e.preventDefault();
        const { id, name, city, phoneNum, pickupAddress, avatar, password } = this.state.user;
        let body = {
            name: name.value,
            city: city.value,
            phoneNum: phoneNum.value,
            pickupAddress: pickupAddress.value,
        };
        avatar.updated && (body.picture = avatar.value);
        password.value && (body.password = password.value);
        axios.put(`${apiPath}business/update/${id}`, body, {
            headers: { 'Content-Type': 'application/json' },
        }).then((response)=>{
            console.log(response)
            alert("modifications has been saved")
        });
    }

    handleFile = (e) => {
        e.preventDefault && e.preventDefault();
        var image, canvas, i;
        var images = 'files' in e.target ? e.target.files : 'dataTransfer' in e ? e.dataTransfer.files : [];
        if (images && images.length) {
            for (i in images) {
                if (typeof images[i] != 'object') continue;
                image = new Image();
                image.src = this.createObjectURL(images[i]);
                image.onload = (e) => {
                    var mybase64resized = this.resizeCrop(e.target, 150, 150).toDataURL('image/jpg', 90);
                    this.setState(currentState => {
                        currentState.user.avatar.value = mybase64resized;
                        currentState.user.avatar.updated = true;
                        return currentState;
                    });
                }
            }
        }
    }

    resizeCrop = (src, width, height) => {
        var crop = width == 0 || height == 0;
        // not resize
        if (src.width <= width && height == 0) {
            width = src.width;
            height = src.height;
        }
        // resize
        if (src.width > width && height == 0) {
            height = src.height * (width / src.width);
        }

        // check scale
        var xscale = width / src.width;
        var yscale = height / src.height;
        var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
        // create empty canvas
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : Math.round(src.width * scale);
        canvas.height = height ? height : Math.round(src.height * scale);
        canvas.getContext("2d").scale(scale, scale);
        // crop it top center
        canvas.getContext("2d").drawImage(src, ((src.width * scale) - canvas.width) * -.5, ((src.height * scale) - canvas.height) * -.5);
        return canvas;
    }

    createObjectURL = (i) => {
        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        return URL.createObjectURL(i);
    }

    handleDelete = () => {
        const { id } = this.state.user;
        axios.put(`${apiPath}business/update/${id}`, { isDeletedAcc: true }, {
            headers: { 'Content-Type': 'application/json' },
        }).then(logOut);
    }

    render() {
        
        const { classes } = this.props;
        const { name, city, pickupAddress, phoneNum, email, password, passwordRepeat, isChecked, isValid, avatar ,ShopifyURL } = this.state.user;
        const { handleInput } = this;
        return (

            <Grid container spacing={0}>
                <Grid item md={6} sm={12} xs={12} className={classes.column}>
                    {avatar.value ? <div className={classes.avatar} style={{ backgroundImage: `url(${avatar.value})` }}></div> : <div className={[classes.avatar, classes.defaultAvatar].join(' ')}></div>}
                    <Button className={classes.fileUpload}>
                        <PhotoIcon /> Change Image
                        <input type='file' onChange={(event) => { this.handleFile(event) }} />
                    </Button>
                    <p className={classes.removeImgText}><ClearIcon /> REMOVE IMAGE</p>
                    <div className={classes.accountId}>
                        <p className={classes.removeImgText}><CheckIcon /><span className={classes.secondaryText}>Your Account Is Verified</span></p>
                        <Button style={{ width: 261 }} >Update Your ID Number</Button>
                    </div>

                    <div className={classes.url}>
                        <div className={classes.shopify}><span><img src='/pictures/icons/preview.png'></img> Shopify URL </span><span>Edit</span></div>
                        {ShopifyURL}
                    </div>
                    <div className={classes.accountId} style={{ paddingBottom: 0 }}>
                        <Button onClick={this.handleDelete} style={{ backgroundColor: 'inherit', color: '#979797', fontSize: 14, margin: 0, textTransform: 'none' }}>Delete account</Button>
                    </div>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <form style={{textAlign:'center'}} onSubmit={(event) => this.updateOwner(event)}>
                        <h2>{email.value}</h2>
                        <FormGroup className={classes.formGroup}>
                            <TextField
                                error={isChecked && !isValid && name.errMsg && !name.isValid}
                                label="Full Name"
                                value={name.value}
                                onInput={(event) => { handleInput('name', event.target.value) }}
                                helperText={isChecked && !isValid && !name.isValid && name.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && city.errMsg && !city.isValid}
                                label="City"
                                value={city.value}
                                onInput={(event) => { handleInput('city', event.target.value) }}
                                helperText={isChecked && !isValid && !city.isValid && city.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && phoneNum.errMsg && !phoneNum.isValid}
                                label="Phone Number"
                                value={phoneNum.value}
                                type='number'
                                onInput={(event) => { handleInput('phoneNum', event.target.value) }}
                                helperText={isChecked && !isValid && !phoneNum.isValid && phoneNum.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && pickupAddress.errMsg && !pickupAddress.isValid}
                                label="Pickup Address"
                                value={pickupAddress.value}
                                onInput={(event) => { handleInput('pickupAddress', event.target.value) }}
                                helperText={isChecked && !isValid && !pickupAddress.isValid && pickupAddress.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && password.errMsg && !password.isValid}
                                label="Password"
                                value={password.value}
                                onInput={(event) => { handleInput('password', event.target.value) }}
                                helperText={isChecked && !isValid && !password.isValid && password.errMsg}
                                type='password'
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && passwordRepeat.errMsg && !passwordRepeat.isValid}
                                label="Repeat password"
                                value={passwordRepeat.value}
                                onInput={(event) => { handleInput('passwordRepeat', event.target.value) }}
                                helperText={isChecked && !isValid && !passwordRepeat.isValid && passwordRepeat.errMsg}
                                type='password'
                                margin="normal"
                                variant="outlined"
                            />
                        </FormGroup>
                        <Button className={classes.submitBtn} type='submit'>Submit</Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(connect(
    state => ({
        loginData: state.loginData,
    }),
    dispath => ({
        onLogin: (userData) => {
            dispath({ type: 'LOGIN_USER', payload: userData });
        }
    }),
)(Profile));