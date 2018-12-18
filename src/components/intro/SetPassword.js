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

import Header from './Header';
import Thanks from './ThanksPasswordChange';

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

class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            password: {
                value: '',
                isValid: false,
                errMsg: 'Password should contain lowercase and uppercase characters and digits. It must be at least 8 characters long.',
            },
            repeatPassword: {
                value: '',
                isValid: false,
                errMsg: 'passwords are not equal',
            },
            isValid: false,
            isChecked: false,
            sended: false,
        }
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
            currentState.isValid = (currentState.password.isValid && currentState.repeatPassword.isValid);
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
                valid = !!value.match(/(?=^.{8,}$)^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/);
                break;
            case 'repeatPassword':
                valid = (value == this.state.password.value);
                break;
        }
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            errMsg && (currentState[field].errMsg = errMsg);
            return currentState;
        });
    }

    handleSign = (e) => {
        e.preventDefault();
        const { password } = this.state;
        var url_string = window.location.href;
        var url = new URL(url_string);
        var link = url.searchParams.get("link");
        console.log(link)
        //return false;
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {
            e.preventDefault();
            axios.post(apiPath + "SetPassword", {
                password: password.value,
                link: link,
            })
            .then(response => {
                return response;
            })
            .then(json => {
                if ('updated' === json.data.msg) {
                    this.setState({ sended: true });

                } else alert("restore failed");

            })
            .catch(error => {
                if (error.response) {

                    const msg = error.response.data.msg;
                    console.log(msg)
                    if ('No user found in this email' === msg) {
                        this.setState(currentState => {
                            currentState.email.errMsg = msg;
                            return currentState;
                        });
                    }
                }
            });
        }
    }


    render() {
        const { password, repeatPassword, isChecked, isValid } = this.state;
        const { classes } = this.props;
        if (this.state.sended) return (
            <div>
                
                <Thanks />
            </div>
        );
        return (
            <div>
                <Header />
                <form className={classes.root} onSubmit={this.handleSign}>
                    <h1>SET PASSWORD</h1>
                    <FormGroup>
                    <div class="w-100">
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
                    </div>
                    <div class="w-100">
                        <TextField
                            error={isChecked && !isValid && repeatPassword.errMsg && !repeatPassword.isValid}
                            label="Repeat password"
                            value={repeatPassword.value}
                            onInput={(event) => { this.handleInput('repeatPassword', event.target.value) }}
                            helperText={isChecked && !isValid && !repeatPassword.isValid && repeatPassword.errMsg}
                            type='password'
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                        
                    </FormGroup>
                    
                    <Button type='submit' className={classes.btn} >Submit</Button>
                </form>
            </div>
        );
    }
}

SetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SetPassword);