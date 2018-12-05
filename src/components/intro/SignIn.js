import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import Header from './Header';

const style = theme => ({
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
    }
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            role: {
                value: '',
                isValid: false,
                errMsg: 'please select role'
            },
            roles: [
                {
                    value: 'BOwners',
                    label: 'Business owner'
                },
                {
                    value: 'Suppliers',
                    label: 'Supplier'
                },
                {
                    value: 'Couriers',
                    label: 'Courier'
                },
            ],
            isValid: false,
            isChecked: false,
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
        this.validateField(field, value);
        this.validateForm();
    }

    validateForm = () => {
        this.setState(currentState => {
            currentState.isValid = (currentState.email.isValid && currentState.password.isValid && currentState.role.isValid);
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
            case 'password':
                valid = !!value.match(/\s*([\w]{6,})\s*/);
                break;
            case 'role':
                valid = !!value;
                break
        }
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            errMsg && (currentState[field].errMsg = errMsg);
            return currentState;
        });
    }

    handleSign = (e) => {
        const { email, password, role } = this.state;
        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {
            window.myOwnProps.loginUser(email.value, password.value, role.value)
            .then(console.log)
            .catch((err) => {
                console.log('err: ',err)
                if('No user found in this email' == err){
                    this.setState(currentState => {
                        currentState.email.isValid = false;
                        currentState.email.errMsg = 'No user found in this email';
                        currentState.isValid = false;
                        return currentState;
                    });
                } else if('password did not match with the email' == err){
                    this.setState(currentState => {
                        currentState.password.isValid = false;
                        currentState.password.errMsg = 'password did not match with the email';
                        currentState.isValid = false;
                        return currentState;
                    });
                }
                
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { email, password, isChecked, isValid, roles, role } = this.state;
        return (
            <div>
                <Header />
                <form className={classes.root} onSubmit={this.handleSign}>
                    <h1>SIGN UP</h1>
                    as business owner
                        <FormGroup>
                        <TextField
                            error={isChecked && !isValid && email.errMsg && !email.isValid}
                            label="Email"
                            value={email.value}
                            onInput={(event) => { this.handleInput('email', event.target.value) }}
                            helperText={isChecked && !isValid && !email.isValid && email.errMsg}
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
                            error={isChecked && !isValid && role.errMsg && !role.isValid}
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
                        </TextField>

                    </FormGroup>
                    <Button type='submit' className={classes.btn} >Sign Up</Button>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(SignIn);