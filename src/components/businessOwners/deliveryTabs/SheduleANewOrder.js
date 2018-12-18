import axios from 'axios';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import apiPath from '../../../services/apiPath';
import getData from '../../../services/getData';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbar from '../../globalComponents/CustomizedSnackbar';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';

const style = theme => ({
    root: {
        backgroundColor: theme.palette.error.dark,
        padding: 50,
        // textAlign: 'center',
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
            padding: '50px 9px',
        },
    },
    btn: {
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        marginBottom: 50,
        width: 250,
        '&:hover': {
            backgroundColor: '#7BB203',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    formControl: {
        alignItems: 'flex-start',
    },
    group: {
        flexDirection: 'row',
        color: '#979797',
    },
    divider: {
        width: '45%',

    },
    btnAdd: {
        fontSize: 18,
        height: 60,
        alignSelf: 'flex-end',

    },
    topForm: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    leftColumn: {
        paddingRight: 50,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    rightColumn: {
        paddingLeft: 50,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    }
});

class SheduleANewOrder extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            snackOpen: false,
            deliveryType: { value: 'cashOnDelivery' },
            snackMessage: {
                key: 1,
                message: '',
            },
            snackVariant: '',
            pickupTime: {
                value: new Date().toLocaleTimeString(),
            },
            pickupDate: {
                value: new Date().toLocaleDateString(),
            },
            fullName: {
                value: '',
            },
            city: {
                value: '',
            },
            productType: {
                value: '',
            },
            notes: {
                value: '',
            },
            deliverTime: {
                value: '',
            },
            deliverDate: {
                value: '',
            },
            phoneNumber: {
                value: '',
            },
            fullAddress: {
                value: '',
            },
            productPrice: {
                value: '',
            },
            isValid: false,
            isChecked: false,
        }
    }

    handleSign = (e) => {
        const { email, question, role, subject, description, file } = this.state;
        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {
            axios.post(apiPath + "contactus", {
                userType: role.value,
                email: email.value,
                question: question.value,
                subject: subject.value,
                description: description.value,
                file: file,
            })
                .then(response => {
                    console.log(response);
                    this.setState({
                        snackOpen: true,
                        snackMessage: {
                            key: 1,
                            message: <span>{response.data.message}</span>,
                        },
                        snackVariant: 'success',
                    })
                    return response;
                })
                .catch(err => {
                    console.log(err.message);
                    this.setState({
                        snackOpen: true,
                        snackMessage: {
                            key: 1,
                            message: <span>{err.message}</span>,
                        },
                        snackVariant: 'error',
                    })
                });
        }
    }

    handleClickAway = () => {
        this.props.close();
    }

    handleInput = (field, value) => {
        this.setState((currentState) => {
            currentState[field].value = value;
            return currentState;
        });
        if (('question' == field) && ('cashOnDelivery' != value)) {
            this.setState((currentState) => {
                currentState.role.value = '';
                return currentState;
            });
        }
        this.validateField(field, value);
        // this.validateForm();
    }

    validateForm = () => {
        this.setState(currentState => {
            // currentState.isValid = (currentState.description.isValid && currentState.email.isValid && currentState.question.value && currentState.description.value);
            return currentState;
        });
    }

    validateField = (field, value) => {
        let valid = false;
        let errMsg = undefined;
        switch (field) {
            case 'email':
                valid = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                errMsg = 'invalid email';
                break;
            case 'description':
                valid = (value.length > 29);
                break
        }
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            errMsg && (currentState[field].errMsg = errMsg);
            return currentState;
        });
    }

    closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackOpen: false, });
    };

    render() {
        const { classes } = this.props;
        const {
            isChecked,
            isValid,
            deliveryType,
            pickupTime,
            pickupDate,
            fullName,
            city,
            productType,
            notes,
            deliverTime,
            deliverDate,
            phoneNumber,
            fullAddress,
            productPrice
        } = this.state;
        return (
            <div>
                <form className={classes.root} onSubmit={this.handleSign}>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                        <Grid item sm={12} className={classes.topForm}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel style={{ fontSize: 24, fontWeight: 'normal' }}>Delivery type</FormLabel>
                                <RadioGroup
                                    aria-label="Delivery"
                                    name="delivery"
                                    className={classes.group}
                                    value={deliveryType.value}
                                    onChange={(event) => this.handleInput('deliveryType', event.target.value)}
                                >
                                    <FormControlLabel value="cashOnDelivery" control={<Radio color="primary" />} label="Cash on Delivery" />
                                    <FormControlLabel value="normalDelivery" control={<Radio color="primary" />} label="Normal Delivery" />
                                </RadioGroup>
                            </FormControl>
                            <Button className={[classes.btnAdd, classes.btn].join(' ')}> <AddIcon />ADD ORDER</Button>
                        </Grid>
                        <Grid item sm={12} lg={6} className={classes.leftColumn}>

                                <FormLabel style={{ fontSize: 18, fontWeight: 'bold' }}>Pick up</FormLabel>
                                <FormGroup className={classes.group} style={{ justifyContent: 'space-between' }}>
                                    <div className={classes.divider}>
                                        <TextField
                                            // error={isChecked && !isValid && question.errMsg && !question.value}
                                            label="Time"
                                            type='time'
                                            value={pickupTime.value}
                                            onChange={(event) => { this.handleInput('pickupTime', event.target.value) }}
                                            // helperText={isChecked && !isValid && !question.isValid && question.errMsg}
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                        >
                                        </TextField>
                                    </div>
                                    <div className={classes.divider}>

                                        <TextField
                                            // error={isChecked && !isValid && email.errMsg && !email.isValid}
                                            label="Date"
                                            type='date'
                                            value={pickupDate.value}
                                            onInput={(event) => { this.handleInput('pickupDate', event.target.value) }}
                                            // helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </div>
                                </FormGroup>
                                <TextField
                                    label="Full name"
                                    value={fullName.value}
                                    onInput={(event) => { this.handleInput('fullName', event.target.value) }}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    // error={isChecked && !isValid && question.errMsg && !question.value}
                                    select
                                    label="City"
                                    value={city.value}
                                    onChange={(event) => { this.handleInput('city', event.target.value) }}
                                    // helperText={isChecked && !isValid && !question.isValid && question.errMsg}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                >
                                    <MenuItem value='Kyiv'>Kyiv</MenuItem>
                                    <MenuItem value='Kharkiv'>Kharkiv</MenuItem>
                                    <MenuItem value='Lviv'>Lviv</MenuItem>
                                    <MenuItem value='Dnipro'>Dnipro</MenuItem>
                                </TextField>
                                <TextField
                                    label="Product type"
                                    value={productType.value}
                                    onInput={(event) => { this.handleInput('productType', event.target.value) }}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    // error={isChecked && !isValid && description.errMsg && !description.isValid}
                                    label="Notes"
                                    multiline
                                    rows="4"
                                    value={notes.value}
                                    onInput={(event) => { this.handleInput('notes', event.target.value) }}
                                    // helperText={isChecked && !isValid && !description.isValid && description.errMsg}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                        </Grid>
                        <Grid item sm={12} lg={6} className={classes.rightColumn}>
                                <FormLabel style={{ fontSize: 18, fontWeight: 'bold' }}>Deliver</FormLabel>
                                <FormGroup className={classes.group} style={{ justifyContent: 'space-between' }}>
                                    <div className={classes.divider}>
                                        <TextField
                                            // error={isChecked && !isValid && question.errMsg && !question.value}
                                            label="Time"
                                            type='time'
                                            value={deliverTime.value}
                                            onChange={(event) => { this.handleInput('deliverTime', event.target.value) }}
                                            // helperText={isChecked && !isValid && !question.isValid && question.errMsg}
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                        >
                                        </TextField>
                                    </div>
                                    <div className={classes.divider}>

                                        <TextField
                                            // error={isChecked && !isValid && email.errMsg && !email.isValid}
                                            label="Date"
                                            type='date'
                                            value={deliverDate.value}
                                            onInput={(event) => { this.handleInput('deliverDate', event.target.value) }}
                                            // helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </div>
                                </FormGroup>
                                <TextField
                                    // error={isChecked && !isValid && email.errMsg && !email.isValid}
                                    label="Phone Number"
                                    value={phoneNumber.value}
                                    onInput={(event) => { this.handleInput('phoneNumber', event.target.value) }}
                                    // helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    label="Full Address"
                                    value={fullAddress.value}
                                    onInput={(event) => { this.handleInput('fullAddress', event.target.value) }}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    label="Product Price"
                                    value={productPrice.value}
                                    onInput={(event) => { this.handleInput('productPrice', event.target.value) }}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Button type='submit' className={[classes.btnAdd, classes.btn].join(' ')} >Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </div >
        );
    }
}

SheduleANewOrder.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(SheduleANewOrder);