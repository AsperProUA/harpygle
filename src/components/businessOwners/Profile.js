import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/CheckCircle';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

const style = theme => ({
    avatar: {
        width: 101,
        height: 101,
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
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
    }
});

const defaultAvatar = 'pictures/poy_benbernanke.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                avatar: null,
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
            },
            isValid: false,
            isChecked: false,
        }
        this.fetchOwner();
    }

    fetchOwner = () => {
        window.myOwnProps.getData({ url: `business/get/${JSON.parse(localStorage['appState']).user.id}` })
            .then(response => {

                const { ownerID, name, city, phoneNum, email, pickupAddress, password } = response.data;
                console.log(response);
                this.setState(currentState => {
                    const { user } = currentState;
                    user.id = ownerID;
                    user.name.value = name;
                    user.city.value = city;
                    user.phoneNum.value = phoneNum;
                    user.email.value = email;
                    user.pickupAddress.value = pickupAddress;
                    user.password.value = password;
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
        e.preventDefault();
        const {id, name, city,phoneNum, pickupAddress, password} = this.state.user;
        console.log(name);
        axios.put(`${window.myOwnProps.apiPath}business/update/${id}`,{
                password: password.value,
                name: name.value,
                city: city.value,
                phoneNum: phoneNum.value,
                pickupAddress: pickupAddress.value,
        },{
            headers: {'Content-Type': 'application/json'}, 
        }).then(console.log);
    }

    render() {
        console.log(this.state.user)
        const { classes } = this.props;
        const { name, city, pickupAddress, phoneNum, email, password, passwordRepeat, isChecked, isValid } = this.state.user;
        const { handleInput } = this;
        return (
            <Grid container spacing={0}>
                <Grid item md={6}  sm={12}  xs={12} className={classes.column}>
                    {this.state.user.avatar ? <div className={classes.avatar}>Img</div> : <div className={[classes.avatar, classes.defaultAvatar].join(' ')}></div>}
                    <Button><PhotoIcon /> Change Image</Button>
                    <p className={classes.removeImgText}><ClearIcon /> REMOVE IMAGE</p>
                    <div className={classes.accountId}>
                        <p className={classes.removeImgText}><CheckIcon /><span className={classes.secondaryText}>Your Account Is Verified</span></p>
                        <Button style={{ width: 261 }} >Update Your ID Number</Button>
                    </div>

                    <div className={classes.url}>
                        <div className={classes.shopify}><span><img src='/pictures/icons/preview.png'></img> Shopify URL </span><span>Edit</span></div>
                        https://egypt.souq.com/
                    </div>
                    <div className={classes.accountId} style={{ paddingBottom: 0 }}>
                        <Button style={{ backgroundColor: 'inherit', color: '#979797', fontSize: 14, margin: 0, textTransform: 'none' }}>Delete account</Button>
                    </div>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <form onSubmit={(event) => this.updateOwner(event)}>
                        <h2>{email.value}</h2>
                        <FormGroup className={classes.formGroup}>
                            <TextField
                                error={isChecked && !isValid && name.errMsg && !name.isValid}
                                label="Full Name"
                                value={name.value}
                                onInput={(event) => { this.handleInput('name', event.target.value) }}
                                helperText={isChecked && !isValid && !name.isValid && name.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && city.errMsg && !city.isValid}
                                label="City"
                                value={city.value}
                                onInput={(event) => { this.handleInput('city', event.target.value) }}
                                helperText={isChecked && !isValid && !city.isValid && city.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && phoneNum.errMsg && !phoneNum.isValid}
                                label="Phone Number"
                                value={phoneNum.value}
                                type='number'
                                onInput={(event) => { this.handleInput('phoneNum', event.target.value) }}
                                helperText={isChecked && !isValid && !phoneNum.isValid && phoneNum.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && pickupAddress.errMsg && !pickupAddress.isValid}
                                label="Pickup Address"
                                value={pickupAddress.value}
                                onInput={(event) => { this.handleInput('pickupAddress', event.target.value) }}
                                helperText={isChecked && !isValid && !pickupAddress.isValid && pickupAddress.errMsg}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && password.errMsg && !password.isValid}
                                label="Password"
                                value={password.value}
                                onInput={(event) => { this.handleInput('password', event.target.value) }}
                                helperText={isChecked && !isValid && !password.isValid && password.errMsg}
                                type='password'
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                error={isChecked && !isValid && passwordRepeat.errMsg && !passwordRepeat.isValid}
                                label="Repeat password"
                                value={passwordRepeat.value}
                                onInput={(event) => { this.handleInput('passwordRepeat', event.target.value) }}
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

export default withStyles(style)(Profile);