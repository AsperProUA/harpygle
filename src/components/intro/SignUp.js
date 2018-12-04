import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';

const style = theme => ({
    root: {
        paddingTop: '40px',
        maxWidth: 465,
        maxHeight: 615,
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
        width: 350,
        [theme.breakpoints.down('sm')]: {
            width: 220,
        },
    },
    label: {
        textAlign: 'left',
        margin: '30px',
        color: '#979797',
        fontSize: 18,
        fontWeight: 'bold',
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

class SignUp extends Component {
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
            passwordRepeat: {
                value: '',
                isValid: false,
                errMsg: 'passwords are not equal',
            },
            isValid: false,
            isChecked: false,
        }
        switch (this.props.registered){
            case 'business owner':
            this.path = 'business/create';
            break;
            case 'supplier':
            this.path = 'supplier/create';
            break;

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
            currentState.isValid = (currentState.email.isValid && currentState.password.isValid && currentState.passwordRepeat.isValid);
            return currentState;
        });
    }

    validateField = (field, value) => {
        let valid = false;
        switch (field) {
            case 'email':
                valid = !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                break;
            case 'password':
                valid = !!value.match(/\s*([\w]{6,})\s*/);
                break;
            case 'passwordRepeat':
                valid = (value == this.state.password.value);
                break;
        }
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            return currentState;
        });
    }

    handleSign = (e) => {
        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if(this.state.isValid){
            axios.post(`${window.myOwnProps.apiPath}${this.path}`, {
                email: this.state.email.value,
                password: this.state.password.value,
                name: undefined,
                city: undefined,
                phoneNum: undefined,
                verificationID: undefined,
                isDeletedAcc: undefined,
                picture: undefined,
            }).then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    document.location.href = '/';
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { classes } = this.props;
        let { email, password, passwordRepeat, isChecked, isValid } = this.state;
        console.log(this.state);
        return (
            <div className={classes.root}>
                <ClickAwayListener onClickAway={this.handleClickAway}>
                    <form>
                        <h1>SIGN UP</h1>
                        as {this.props.registered}
                        <FormGroup>
                            <FormLabel className={classes.label}>
                                Email<br />
                                <Input value={email.value} onInput={(event) => { this.handleInput('email', event.target.value) }} type='email' placeholder='Email' className={classes.input} />
                                <span className={classes.error}>{isChecked && !isValid && !email.isValid && email.errMsg}</span>
                            </FormLabel>
                            <FormLabel className={classes.label}>
                                Password<br />
                                <Input value={password.value} onInput={(event) => { this.handleInput('password', event.target.value) }} type='password' placeholder='Password' className={classes.input} />
                                <span className={classes.error}>{isChecked && !isValid && !password.isValid && password.errMsg}</span>
                            </FormLabel>
                            <FormLabel className={classes.label}>
                                Repeat password<br />
                                <Input value={passwordRepeat.value} onInput={(event) => { this.handleInput('passwordRepeat', event.target.value) }} type='password' placeholder='Password again' className={classes.input} />
                                <span className={classes.error}>{isChecked && !isValid && !passwordRepeat.isValid && passwordRepeat.errMsg}</span>
                            </FormLabel>
                        </FormGroup>
                        <Button className={classes.btn} onClick={this.handleSign}>Sign Up</Button>
                    </form>
                </ClickAwayListener>
            </div>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(SignUp);