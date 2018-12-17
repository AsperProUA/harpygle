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
                currentPassword: {
                    value: '',
                    isValid: false,
                    errMsg: 'password did not match',
                },
                newPassword: {
                    value: '',
                    isValid: false,
                    errMsg: 'password is too short',
                },
                securityQuestionID: { value: '', },
                securityAns: { value: '', },
                ShopifyURL: 'https://egypt.souq.com/',

            },
            isValid: false,
            isChecked: false,
        }
        this.fetchPartner();
    }

    fetchPartner = () => {
        getData({ url: `partner/get/${this.props.loginData.user.id}` })
            .then(response => {

                const { partnerID, securityQuestionID, securityAns, email, pictureUrl } = response.data;
                this.setState(currentState => {
                    const { user } = currentState;
                    user.id = partnerID;
                    user.securityQuestionID.value = securityQuestionID;
                    user.securityAns.value = securityAns;
                    user.email.value = email;
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

    updatePartner = (e) => {
        e && e.preventDefault();
        const { id, securityQuestionID, securityAns, avatar, newPassword } = this.state.user;
        let body = {
            securityQuestionID: securityQuestionID.value,
            securityAns: securityAns.value,
        };
        avatar.updated && (body.picture = avatar.value);
        newPassword.value && (body.password = newPassword.value);
        console.log(body);
        axios.put(`${apiPath}partner/update/${id}`, body, {
            headers: { 'Content-Type': 'application/json' },
        }).then(console.log);
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
        axios.put(`${apiPath}partner/update/${id}`, { isDeletedAcc: true }, {
            headers: { 'Content-Type': 'application/json' },
        }).then(logOut);
    }

    render() {
        
        const { classes } = this.props;
        const { securityQuestionID, securityAns, email, currentPassword, newPassword, isChecked, isValid, avatar ,ShopifyURL } = this.state.user;
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
                    <form style={{textAlign:'center'}} onSubmit={(event) => this.updatePartner(event)}>
                        <h2>{email.value}</h2>
                        <FormGroup className={classes.formGroup}>
                            <TextField
                                error={isChecked && !isValid && email.errMsg && !email.isValid}
                                label="Email Address"
                                value={email.value}
                                onInput={(event) => { handleInput('email', event.target.value) }}
                                helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && securityQuestionID.errMsg && !securityQuestionID.isValid}
                                label="Security Question"
                                value={securityQuestionID.value}
                                onInput={(event) => { handleInput('securityQuestionID', event.target.value) }}
                                helperText={isChecked && !isValid && !securityQuestionID.isValid && securityQuestionID.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && securityAns.errMsg && !securityAns.isValid}
                                label="Security Answer"
                                value={securityAns.value}
                                onInput={(event) => { handleInput('securityAns', event.target.value) }}
                                helperText={isChecked && !isValid && !securityAns.isValid && securityAns.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && currentPassword.errMsg && !currentPassword.isValid}
                                label="Current Password"
                                value={currentPassword.value}
                                onInput={(event) => { handleInput('currentPassword', event.target.value) }}
                                helperText={isChecked && !isValid && !currentPassword.isValid && currentPassword.errMsg}
                                type='password'
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && newPassword.errMsg && !newPassword.isValid}
                                label="New Password"
                                value={newPassword.value}
                                onInput={(event) => { handleInput('newPassword', event.target.value) }}
                                helperText={isChecked && !isValid && !newPassword.isValid && newPassword.errMsg}
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