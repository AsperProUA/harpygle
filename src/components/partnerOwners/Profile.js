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
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import getData from '../../services/getData';
import logOut from '../../services/logOut';
import '../../css/partnerProfile.css';
import { isNumber } from 'util';

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
    root: {
        maxWidth: 465,
        textAlign: 'center',
        margin: 'auto',
        backgroundColor: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'lighter',
        color: '#707070',
        '& h1': {
            fontSize: 36,
            fontWeight: 'lighter',
            color: '#707070',
            margin: '30px auto',
            marginBottom: 5,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    input: {
        border: '1px solid #D0D0D0',
        borderRadius: '10px',
        padding: '10px 20px',
    },
    label: {
        textAlign: 'left',
        margin: '10px',
        color: '#979797',
        fontSize: 18,
        fontWeight: 'bold',
        width: 'auto',
    },
    btn: {
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        marginBottom: 50,
        width: 250,
        '&:hover': {
            backgroundColor: '#7BB203',
        }
    },
    error: {
        fontSize: 12,
        color: theme.palette.error.main,
        fontWeight: 300
    },
    forgot: {
        '& a': {
            textDecoration: 'none',
            color: '#25AAE1',
        },
    },
});

const defaultAvatar = 'pictures/poy_benbernanke.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: '',
            isLoading: false,
            user: {
                id: '',
                avatar: {
                    updated: false,
                    value: null,
                },
                idFile: [],
                idFileName: [],
                documentVerificationStatus: 'not verified',
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
                securityQuestionID: {
                    value: '',
                    isValid: false,
                    errMsg: 'please select Security Question'
                },
                securityAns: { value: '', },
                ShopifyURL: 'https://egypt.souq.com/',
            },
            isValid: false,
            isChecked: false,

            securityQuestions: [
                {
                    value: '0',
                    label: "What is your mother's maiden name?"
                },
                {
                    value: '1',
                    label: 'What is the name of your favourite childhood pet?'
                },
                {
                    value: '2',
                    label: 'What is the last name of the teacher who gave you your first failing grade?'
                },
            ],
        }
        this.fetchPartner();
    }

    fetchPartner = () => {
        getData({ url: `partner/get/${this.props.loginData.user.id}` })
            .then(response => {

                const { partnerID, securityQuestionID, securityAns, email, pictureUrl, verificationIDUrl, isDocumentVerified } = response.data;
                console.log(response.data);
                this.setState(currentState => {
                    const { user } = currentState;
                    user.id = partnerID;
                    user.securityQuestionID.value = securityQuestionID;
                    user.securityAns.value = securityAns;
                    user.email.value = email;
                    user.avatar.value = pictureUrl;
                    user.idFile = [];
                    if(verificationIDUrl !== null){
                        user.idFileName = verificationIDUrl;
                    }
                    user.documentVerificationStatus = isDocumentVerified;
                                         
                    return currentState;
                });

                this.props.onUpdate({
                    avatar: pictureUrl,
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
        this.setState({
            isLoading : true,
        })
        e && e.preventDefault();
        const { id, securityQuestionID, securityAns, avatar, newPassword, idFile } = this.state.user;
        let body = {
            securityQuestionID: securityQuestionID.value,
            securityAns: securityAns.value,
        };
        avatar.updated && (body.picture = avatar.value);
        newPassword.value && (body.password = newPassword.value);
        if (idFile.length !== 0) {
            body.verificationID = idFile;
        }        
        console.log(body);
        axios.put(`${apiPath}partner/update/${id}`, body, {
            headers: { 'Content-Type': 'application/json' },
        }).then( (res) => {
            this.handleOpenSnackbar();
            this.fetchPartner();
        }).catch((err)=>console.log(err))
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

    handleIdNumberFile = (e) => {
        e.preventDefault && e.preventDefault();
        var image, canvas, i;
        var count = -1;
        var images = 'files' in e.target ? e.target.files : 'dataTransfer' in e ? e.dataTransfer.files : [];
        if(this.state.user.idFile.length + images.length > 2){
            alert('You can upload 2 images only');
            return
        }
        if (images && images.length) {
            for (i in images) {                               
                if (typeof images[i] != 'object') continue;
                image = new Image();
                image.src = this.createObjectURL(images[i]);
                image.onload = (e) => {
                    count++;
                    var mybase64resized = this.resizeCrop(e.target, e.target.width, e.target.height).toDataURL('image/jpg');
                    this.setState(currentState => {
                        var obj = {
                            value : mybase64resized,
                            name: images[count].name,
                            indexKey: count
                        }
                        currentState.user.idFile.push(obj);
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
        axios.delete(`${apiPath}partner/delete/${id}`, { isDeletedAcc: true }, {
            headers: { 'Content-Type': 'application/json' },
        }).then(logOut);
    }

    handleOpenSnackbar =  () => {
        this.setState({ snackbarOpen: true, snackbarMessage: 'Updated Successfully!', isLoading: false });
    };

    handleCloseSnackbar = () => {
        this.setState({ snackbarOpen: false });
    };

    deleteFile(e, indexKey) {
        var fileArray = this.state.user.idFile;
        if(fileArray.length === 1){
            fileArray.splice(0, 1);
        }
        else{
            fileArray.splice(indexKey, 1);
        }        
        this.setState(currentState => {
            const { user } = currentState;
            user.idFile = fileArray;
            return currentState;
        });
    }

    renderFiles = (file) => {
        return (
            <div className="fileDisplay" key={file.indexKey}>
                <span className="float-left">{file.name}</span>
                <span className="float-right" onClick={(e) => this.deleteFile(e, file.indexKey)}><b>X</b></span>
            </div>
        );
    }
    renderFileNames = (file) => {
        return (
            <span className="p-2" key={file}>
                <a href={file} target='_blank'><img src={file} width={100} height={100} /></a>
            </span>
        );
    }

    render() {
        
        const { classes } = this.props;
        const { securityQuestionID, securityAns, email, currentPassword, newPassword,
            isChecked, isValid, avatar, idFile, idFileName, documentVerificationStatus } = this.state.user;
        const { snackbarOpen, snackbarMessage, isLoading } = this.state;
        const { handleInput } = this;
        if(isLoading === true) {
            var loader = <div className="loaderDiv">
                <svg className="lds-typing" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="35" cy="62.5" r="2" fill="#5f2a62">
                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="0.8s" begin="-0.4s"></animate>
                    </circle> <circle cx="42.5" cy="62.5" r="2" fill="#a976c3">
                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="0.8s" begin="-0.30000000000000004s"></animate>
                    </circle> <circle cx="50" cy="62.5" r="2" fill="#a0de59">
                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="0.8s" begin="-0.2s"></animate>
                    </circle> <circle cx="57.5" cy="49.2625" r="2" fill="#466b5a">
                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="0.8s" begin="-0.1s"></animate>
                    </circle>
                </svg>
            </div>
        }
        else {
            var loader = '';
        }
        if (documentVerificationStatus == 'verified'){
            var documentStatus = <div><CheckIcon /> <span className={classes.secondaryText}>Documents Verified</span></div>;
            var documentStatusHeading = ''
        }
        else if (documentVerificationStatus == 'not verified'){
            var documentStatus = <div><span className={classes.secondaryText}>Awaiting Verification</span></div>;
            var documentStatusHeading = <h4 className="alert-primary py-2">Thank you. We will notify you if you're accepted within 48 hours.</h4>
        }
        else if (documentVerificationStatus == 'declined'){
            var documentStatus = <div><span className={classes.secondaryText}>Documents Declined</span></div>;
            var documentStatusHeading = <h4 className="alert-primary py-2">Please try uploading documents again.</h4>
        }
        else {
            var documentStatus = <div><span className={classes.secondaryText}>Upload Documents</span></div>;
            var documentStatusHeading = <h4 className="alert-primary py-2">Please try uploading documents.</h4>
        }

        if((documentVerificationStatus === 'not verified' && idFileName.length < 2)||documentVerificationStatus === 'declined'
            || documentVerificationStatus === undefined || documentVerificationStatus === null){
            var updateIdBtn =
                <Button className={classes.fileUpload} style={{ width: 261 }} >Update Your ID Number
                <input type='file' multiple onChange={(event) => { this.handleIdNumberFile(event) }} />
                </Button>
        }
        else {
            var updateIdBtn = ''
        }
        
        return (
            <Grid container spacing={0}>
                <Grid item md={12} className="text-center mt-3">
                    {documentStatusHeading}
                </Grid>
                
                <Grid item md={6} sm={12} xs={12} className={classes.column}>
                    {avatar.value ? <div className={classes.avatar} style={{ backgroundImage: `url(${avatar.value})` }}></div> : <div className={[classes.avatar, classes.defaultAvatar].join(' ')}></div>}
                    <Button className={classes.fileUpload}>
                        <PhotoIcon /> Change Image
                        <input type='file' onChange={(event) => { this.handleFile(event) }} />
                    </Button>
                    <p className={classes.removeImgText}><ClearIcon /> REMOVE IMAGE</p>
                    <div className={classes.accountId}>
                        <p className={classes.removeImgText}>{documentStatus}</p>
                        {idFile.map(file => {
                            return this.renderFiles(file);
                        })}
                        <div className="d-flex">
                            {idFileName.map(file => {
                                return this.renderFileNames(file);
                            })}
                        </div>
                        {updateIdBtn}
                    </div>
                    <div className={classes.accountId} style={{ paddingBottom: 0 }}>
                        <Button  onClick={this.handleDelete} style={{ backgroundColor: 'inherit', color: '#979797', fontSize: 14, margin: 0, textTransform: 'none' }}>Delete account</Button>
                    </div>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <form style={{textAlign:'center'}} onSubmit={(event) => this.updatePartner(event)}>
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
                                select
                                label="Security Question"
                                value={securityQuestionID.value}
                                onChange={(event) => { this.handleInput('securityQuestionID', event.target.value) }}
                                helperText={isChecked && !isValid && !securityQuestionID.isValid && securityQuestionID.errMsg}
                                margin="normal"
                                variant="outlined"
                            >
                                {this.state.securityQuestions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                <Snackbar
                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                    open={snackbarOpen}
                    onClose={this.handleCloseSnackbar}
                    message={snackbarMessage}
                />
                {loader}
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
        },
        onUpdate: (updData) => {
            dispath({ type: 'USER_DATA', payload: updData });
        }
    }),
)(Profile));