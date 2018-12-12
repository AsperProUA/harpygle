import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import apiPath from '../../services/apiPath';
import Header from './Header';
import Thanks from './Thanks';

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

class OwnerSignUp extends Component {
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

            isValid: false,
            isChecked: false,
            sended: false,
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
            currentState.isValid = (currentState.email.isValid && currentState.password.isValid);
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
            default:
                break;
        }
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            errMsg && (currentState[field].errMsg = errMsg);
            return currentState;
        });
    }

    handleSign = (e) => {
        console.log('signing');
        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {
            const { email, password } = this.state;
            axios.post(`${window.myOwnProps.apiPath}supplier/create`, {
                email: email.value,
                password: password.value,
            }).then((response) => {
                if (response.status == 201) {
                    console.log(response);
                    this.setState({ sended: true });
                }
            }).catch((error) => {
                if (error.response.data.error) {
                    this.setState(currentState => {

                        currentState.email.isValid = false;
                        currentState.email.errMsg = error.response.data.error;

                        return currentState;
                    });
                    this.validateForm();
                    console.log(this.state);
                }
            });

        }
    }

    render() {
        const { classes } = this.props;
        const {
            email,
            password,
            isChecked,
            isValid
        } = this.state;
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
                    <h1>SIGN UP</h1>
                    as supplier
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
                    </FormGroup>
                    <Button className={classes.btn} type='submit'>Sign Up</Button>
                </form>
            </div>
        );
    }
}

OwnerSignUp.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(OwnerSignUp);