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
            },
            submited: false,
            restored: false,
        };
    }

    handleInput = (value) => {
        this.setState((currentState) => {
            currentState.email.value = value;
            return currentState;
        });
    }

    handleSign = (e) => {
        const { email } = this.state;
        e.preventDefault();
        axios.post(apiPath + "restore", {
            email: email.value,
        })
            .then(response => {
                return response;
            })
            .then(json => {
                if ('password restored' === json.data.msg) {

                    // show ok

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


    render() {
        const { email } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <form className={classes.root} onSubmit={this.handleSign}>
                    <h1>RESTORE PASSWORD</h1>
                    <FormGroup>
                        <TextField
                            error={!!email.errMsg}
                            label="Email"
                            value={email.value}
                            onInput={(event) => { this.handleInput(event.target.value) }}
                            helperText={email.errMsg}
                            variant="outlined"
                            margin="normal"
                        />
                    </FormGroup>
                    <Button type='submit' className={classes.btn} >Sign Up</Button>
                </form>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ForgotPassword);