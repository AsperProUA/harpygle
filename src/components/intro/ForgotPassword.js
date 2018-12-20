import axios from 'axios';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import apiPath from '../../services/apiPath';
import Thanks from './ThanksForgotPassword'

import Header from './Header';

const styles = theme => ({
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
    btn: {
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        marginBottom: 50,
        width: 250,
        '&:hover': {
            backgroundColor: '#7BB203',
        }
    },

});

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                errMsg: '',
                isValid: false,
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
                    value: 'suppliers',
                    label: 'Supplier'
                },
                {
                    value: 'Couriers',
                    label: 'Courier'
                },
                {
                    value: 'partners',
                    label: 'Partner'
                },
            ],
            submited: false,
            restored: false,
            isValid: false,
            isChecked: false,
            sended: false,
        };
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
            currentState.isValid = (currentState.email.isValid && currentState.role.isValid);
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
                console.log(valid);
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
        e.preventDefault();
        const { email,role } = this.state;
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {
            e.preventDefault();
            axios.post(apiPath + "forgotPassword", {
                email: email.value,
                role: role.value,
            })
            .then(response => {
                return response;
            })
            .then(json => {
                if ('Message Sent' === json.data.msg) {

                    this.setState({ sended: true });

                } else alert("restore failed");

            })
            .catch(error => {
                if (error.response) {

                    const msg = error.response.data.msg;
                    console.log(msg)
                    if ('No user found in this email' === msg) {
                        this.setState(currentState => {
                            currentState.email.isValid = false;
                            currentState.email.errMsg = msg;
                            currentState.isValid = false;
                            return currentState;                            
                        });
                    }
                }
            });
        }
    }

    render() {
        const { email, password, isChecked, isValid, roles, role } = this.state;
        const { classes } = this.props;
        if (this.state.sended) return (
            <div>       
                <Header />         
                <Thanks />
            </div>
        );
        return (
            <div>
                <Header />
                <form className={classes.root} onSubmit={this.handleSign}>
                    <h1>RESTORE PASSWORD</h1>
                    <FormGroup>
                    <div class="w-100">
                        <TextField className="w-100"
                           error={isChecked && !isValid && email.errMsg && !email.isValid}
                            label="Email"
                            value={email.value}
                            onInput={(event) => { this.handleInput('email', event.target.value) }}
                            helperText={email.errMsg}
                            variant="outlined"
                            margin="normal"
                        />
                    </div>
                    <div class="w-100">
                        <TextField className="w-100"
                            error={isChecked && !isValid && role.errMsg && !role.isValid}
                            select
                            label="Role"
                            value={role.value}
                            onChange={(event) => { this.handleInput('role', event.target.value) }}                            
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
                    </div>                        
                    </FormGroup>
                    
                    <Button type='submit' className={classes.btn} >Submit</Button>
                </form>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ForgotPassword);