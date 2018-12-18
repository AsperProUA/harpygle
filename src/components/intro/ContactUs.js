import axios from 'axios';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import apiPath from '../../services/apiPath';
import getData from '../../services/getData';
import Snackbar from '@material-ui/core/Snackbar';
import Footer from './Footer';
import CustomizedSnackbar from '../globalComponents/CustomizedSnackbar';

import Header from './Header';

const style = theme => ({
    root: {
        backgroundColor: theme.palette.error.dark,
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
    file: {
        backgroundColor: 'inherit',
        fontSize: 18,
        fontWeight: 400,
        color: '#979797',
        border: 'none',
        boxShadow: 'none',
        alignSelf: 'flex-start',
        textTransform: 'none',
    },
    iconFile: {
        width: 25,
        height: 25,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
        backgroundImage: "url('pictures/icons/business/paperclip.png')",
    },
});

class ContactUs extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            snackOpen: false,
            snackMessage: {
                key: 1,
                message: '',
            },
            snackVariant: '',
            email: {
                value: '',
                isValid: false,
                errMsg: 'invalid email',
            },
            role: {
                value: '',
                errMsg: 'please select role'
            },
            question: {
                value: '',
                errMsg: 'please select question type'
            },
            subject: { value: '' },
            description: {
                value: '',
                isValid: false,
                errMsg: 'min 30 symbols',
            },
            roles: [
                {
                    value: 'BOwners',
                    label: 'Business owner'
                },
                {
                    value: 'Couriers',
                    label: 'Courier'
                },
            ],
            questions: [
                {
                    value: 'generalInquiries',
                    label: 'General inquiries'
                },
                {
                    value: 'payment',
                    label: 'Payment'
                },
                {
                    value: 'cashOnDelivery',
                    label: 'Cash On Delivery'
                },
                {
                    value: 'partners',
                    label: 'Partners'
                },
            ],
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
        this.validateForm();
    }

    validateForm = () => {
        this.setState(currentState => {
            currentState.isValid = (currentState.description.isValid && currentState.email.isValid && currentState.question.value && currentState.description.value);
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
        const { email, isChecked, isValid, roles, role, questions, question, subject, description, snackMessage, snackOpen, snackVariant } = this.state;
        return (
            <div>
                <Snackbar
                    key={snackMessage.key}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    // variant={snackVariant}
                    open={snackOpen}
                    autoHideDuration={6000}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                >
                    <CustomizedSnackbar
                        variant={snackVariant}
                        className={classes.margin}
                        onClose={this.closeSnackBar}
                        message={snackMessage.message}
                    />
                </Snackbar>
                <Header />
                <form className={classes.root} onSubmit={this.handleSign}>
                    <h1>CONTACT US</h1>
                    <FormGroup>
                        <TextField
                            error={isChecked && !isValid && question.errMsg && !question.value}
                            select
                            label="Question"
                            value={question.value}
                            onChange={(event) => { this.handleInput('question', event.target.value) }}
                            // SelectProps={{
                            //     MenuProps: {
                            //         className: classes.menu,
                            //     },
                            // }}
                            helperText={isChecked && !isValid && !question.isValid && question.errMsg}
                            margin="normal"
                            variant="outlined"
                        >
                            {questions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        {('cashOnDelivery' == question.value) && <TextField
                            error={isChecked && !isValid && role.errMsg && !role.value}
                            select
                            label="Role"
                            value={role.value}
                            onChange={(event) => { this.handleInput('role', event.target.value) }}
                            // SelectProps={{
                            //     MenuProps: {
                            //         className: classes.menu,
                            //     },
                            // }}
                            helperText={isChecked && !isValid && !role.isValid && role.errMsg}
                            margin="normal"
                            variant="outlined"
                        >
                            {roles.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>}
                        <TextField
                            error={isChecked && !isValid && email.errMsg && !email.isValid}
                            label="Email"
                            value={email.value}
                            onInput={(event) => { this.handleInput('email', event.target.value) }}
                            helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                            variant="outlined"
                        />
                        <TextField
                            label="Subject"
                            value={subject.value}
                            onInput={(event) => { this.handleInput('subject', event.target.value) }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            error={isChecked && !isValid && description.errMsg && !description.isValid}
                            label="Description"
                            multiline
                            rows="4"
                            value={description.value}
                            onInput={(event) => { this.handleInput('description', event.target.value) }}
                            helperText={isChecked && !isValid && !description.isValid && description.errMsg}
                            margin="normal"
                            variant="outlined"
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file" style={{ textAlign: 'left' }}>
                            <Button variant="contained" component="span" className={classes.file} >
                                <span className={classes.iconFile} />Attach a File
                            </Button>
                        </label>
                    </FormGroup>
                    <Button type='submit' className={classes.btn} >SUBMIT</Button>
                </form>
                <Footer />
            </div >
        );
    }
}

ContactUs.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(connect(
    state => ({
        loginData: state.loginData,
    }),
    dispath => ({
        onLogin: (loginData) => {
            dispath({ type: 'LOGIN_USER', payload: loginData });
            getData({ url: `business/get/${loginData.user.id}` }).then(response => {
                let userData = {};
                userData.name = response.data.name;
                userData.avatar = response.data.pictureUrl;
                userData.city = response.data.city;
                dispath({ type: 'USER_DATA', payload: userData });
            });
        }
    }),
)(ContactUs));