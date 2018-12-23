import axios from 'axios';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import apiPath from '../../services/apiPath';
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbar from '../globalComponents/CustomizedSnackbar';

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

class AddNewProductRequest extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            snackOpen: false,
            imgs: [],
            snackMessage: {
                key: 1,
                message: '',
            },
            snackVariant: '',
            name: {
                value: '',
                isValid: false,
                errMsg: 'Name can\'t be empty',
            },
            category: {
                value: '',
                isValid: false,
                errMsg: 'min 30 symbols',
            },
            amount: {
                value: '',
                isValid: false,
                errMsg: 'Amount can\'t be 0',
            },
            isValid: false,
            isChecked: false,
        }
    }

    handleSend = (e) => {
        const { name, amount, category, imgs } = this.state;
        e.preventDefault();
        this.setState({ isChecked: true });
        this.validateForm();
        if (this.state.isValid) {
            axios.post(`${apiPath}business/productrequest`, {
                reqAmount: amount.value,
                name: name.value,
                category: category.value,
                images: imgs,
                businessOwnerID: this.props.user.id,
            })
                .then(response => {
                    this.setState({
                        snackOpen: true,
                        snackMessage: {
                            key: 1,
                            message: <span>Product has been added</span>,
                        },
                        snackVariant: 'success',
                    })
                    this.props.history.push('/inventory');
                    return response;

                })
                .catch(err => {
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
        this.validateField(field, value);
        this.validateForm();
    }

    validateForm = () => {
        this.setState(currentState => {
            currentState.isValid = (currentState.name.isValid && currentState.amount.isValid);
            return currentState;
        });
    }

    validateField = (field, value) => {
        let valid = false;
        let errMsg = undefined;
        switch (field) {
            case 'name':
                valid = !!value;
                break;
            case 'amount':
                valid = !!value;
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
                    var mybase64resized = this.resizeCrop(e.target, 300, 300).toDataURL('image/jpg', 90);
                    console.log(mybase64resized)
                    this.setState(currentState => {
                        currentState.imgs.push(mybase64resized);
                        return currentState;
                    });
                }
            }
        }
    }

    createObjectURL = (i) => {
        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        return URL.createObjectURL(i);
    }

    resizeCrop = (src, width, height) => {
        var canvas = document.createElement("canvas");
        var scale;
        console.log(src.src)
        if (src.width > src.height) {
            scale = width / src.width
            canvas.height = Math.round(src.height * scale);
            canvas.width = width;

        } else {
            scale = height / src.height
            canvas.width = Math.round(src.width * scale);
            canvas.height = height;
        }

        // // check scale
        // var xscale = width / src.width;
        // var yscale = height / src.height;
        // var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
        // // create empty canvas

        canvas.getContext("2d").scale(scale, scale);
        // crop it top center
        canvas.getContext("2d").drawImage(src, 0, 0);
        return canvas;
    }

    render() {
        const { classes } = this.props;
        const { isChecked, isValid, name, category, amount, snackMessage, snackOpen, snackVariant } = this.state;
        return (
            <div style={{ width: '100%' }}>
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
                <form className={classes.root} onSubmit={this.handleSend}>
                    <h1>ADD NEW PRODUCT</h1>
                    <FormGroup>
                        <TextField
                            error={isChecked && !isValid && name.errMsg && !name.isValid}
                            label="Name"
                            value={name.value}
                            onInput={(event) => { this.handleInput('name', event.target.value) }}
                            helperText={isChecked && !isValid && !name.isValid && name.errMsg}
                            variant="outlined"
                        />
                        <TextField
                            label="Category"
                            value={category.value}
                            onInput={(event) => { this.handleInput('category', event.target.value) }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            error={isChecked && !isValid && amount.errMsg && !amount.isValid}
                            label="Amount"
                            type='number'
                            value={amount.value}
                            onInput={(event) => { this.handleInput('amount', event.target.value) }}
                            helperText={isChecked && !isValid && !amount.isValid && amount.errMsg}
                            margin="normal"
                            variant="outlined"
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(event) => { this.handleFile(event) }}
                        />
                        <label htmlFor="raised-button-file" style={{ textAlign: 'left' }}>
                            <Button variant="contained" component="span" className={classes.file} >
                                <span className={classes.iconFile} />Attach a File
                            </Button>
                        </label>
                    </FormGroup>
                    <Button type='submit' className={classes.btn} >SUBMIT</Button>
                </form>
            </div >
        );
    }
}

AddNewProductRequest.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(style)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(AddNewProductRequest)));