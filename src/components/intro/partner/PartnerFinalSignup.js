import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import apiPath from '../../../services/apiPath';
import Header from '../Header';
import Thanks from '../Thanks';
import '../../../css/partner.css';
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

class PartnerFinalSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                isValid: true,
                errMsg: 'invalid email',
            },
            firstname: {
                value: '',
                isValid: false,
                errMsg: 'invalid firstname',
            },
            lastname: {
                value: '',
                isValid: false,
                errMsg: 'invalid lastname',
            },
            phone: {
                value: '',
                isValid: false,
                errMsg: 'invalid phone',
            },
            address: {
                value: '',
                isValid: false,
                errMsg: 'invalid address',
            },
            city: {
                value: '',
                isValid: false,
                errMsg: 'invalid city',
            },
            state: {
                value: '',
                isValid: false,
                errMsg: 'invalid state',
            },
            zipcode: {
                value: '',
                isValid: false,
                errMsg: 'invalid zipcode',
            },
            location: {
                value: '',
                isValid: false,
                errMsg: 'invalid location',
            },
            location1: {
                value: '',
                isValid: true,
            },
            location2: {
                value: '',
                isValid: true,
            },
            developTeam: 'yes',
            ownerFullTime: 'yes',
            operateBusiness: 'yes',
            liquidAssets: 'yes',
            isValid: false,
            isChecked: false,
            sended: false,
        }
        this.getPartnerData();
    }

    getPartnerData = () =>{
        var url_string = window.location.href;
        var url = new URL(url_string);
        var partnerId = url.searchParams.get("partner");
        axios.post(`${apiPath}partner/getPartner`, {
            partnerID: partnerId
        }).then((response) => {
            if (response.status == 201) {
                console.log(response);
                this.setState(currentState => {

                    currentState.email.value = response.data.data;

                    return currentState;
                });
            }
        }).catch((error) => {
            if (error.response.data.error) {
                this.setState(currentState => {

                    currentState.email.isValid = false;
                    currentState.email.errMsg = error.response.data.error;

                    return currentState;
                });
                //this.validateForm();
                console.log(this.state);
            }
        });
    }

    handleClickAway = () => {
        this.props.close();
    }

    handleRadioButton = (field, value) => {
        this.setState((currentState) => {
            currentState[field] = value;
            return currentState;
        });    
    }

    handleChange = (field, value) => {
        this.setState((currentState) => {
            currentState[field] = value;
            return currentState;
        });
    };

    handleInput = (field, value) => {
        this.setState((currentState) => {
            currentState[field].value = value;
            return currentState;
        });
        this.validateField(field, value);
        //this.validateForm();
    }

    validateForm = () => {
        this.setState(currentState => {
            currentState.isValid = (currentState.email.isValid && currentState.password.isValid);
            return currentState;
        });
    }

    validateField = (field, value) => {
        debugger;
        let valid = true;
        let errMsg = undefined;
        
        this.setState((currentState) => {
            currentState[field].isValid = valid;
            return currentState;
        });
    }   
      

    handleSigUp = (e) => {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var partnerId = url.searchParams.get("partner");
        
        //let location = this.props.location.query['partner'];
        e.preventDefault();
        this.setState({ isChecked: true });
        //this.validateForm();
        console.log(this.state);
            const { firstname,lastname,email,phone,address,city,state,zipcode,location,location1,location2,
            developTeam,ownerFullTime,operateBusiness,liquidAssets } = this.state;
            axios.post(`${apiPath}partner/updatePartner`, {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                phone: phone.value,
                address: address.value,
                city: city.value,
                state: state.value,
                zipcode: zipcode.value,
                location: location.value,
                location1: location1.value,
                location2: location2.value,
                developTeam: developTeam,
                ownerFullTime: ownerFullTime,
                operateBusiness: operateBusiness,
                liquidAssets: liquidAssets,
                partnerID : partnerId
            }).then((response) => {
                if (response.status == 201) {
                    console.log(response);
                    this.setState({ sended: true });
                }
            }).catch((error) => {
                
            });
        
    }

    render() {
        const { classes } = this.props;
        const {
            email,
            firstname,
            lastname,
            phone,
            address,
            city,
            state,
            zipcode,
            location,
            location1,
            location2,
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
                <form className={classes.root} onSubmit={this.handleSigUp}>
                    <h1>Request more information</h1>
                    and start the process of becoming a Delivery Service Partner
                    <FormGroup>
                        <div className="div100 mt-3">
                            <div className="div50 d-inline">
                                <TextField
                                    error={isChecked && !isValid && firstname.errMsg && !firstname.isValid}
                                    label="Firstname"
                                    value={firstname.value}
                                    onInput={(event) => { this.handleInput('firstname', event.target.value) }}
                                    helperText={isChecked && !isValid && !firstname.isValid && firstname.errMsg}
                                    variant="outlined"
                                />
                            </div>
                            <div className="div50 d-inline">
                                <TextField
                                    error={isChecked && !isValid && lastname.errMsg && !lastname.isValid}
                                    label="Lastname"
                                    value={lastname.value}
                                    onInput={(event) => { this.handleInput('lastname', event.target.value) }}
                                    helperText={isChecked && !isValid && !lastname.isValid && lastname.errMsg}
                                    type='lastname'
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className="div100 mt-3">
                            <TextField
                                error={isChecked && !isValid && email.errMsg && !email.isValid}
                                label="Email"
                                value={email.value}
                                
                                helperText={isChecked && !isValid && !email.isValid && email.errMsg}
                                variant="outlined" disabled
                            />
                        </div>
                        <div className="div100 mt-3">
                            <TextField
                                error={isChecked && !isValid && phone.errMsg && !phone.isValid}
                                label="Phone"
                                value={phone.value}
                                onInput={(event) => { this.handleInput('phone', event.target.value) }}
                                helperText={isChecked && !isValid && !phone.isValid && phone.errMsg}
                                variant="outlined"
                            />
                        </div>
                        <div className="div100 mt-3">
                            <TextField
                                error={isChecked && !isValid && address.errMsg && !address.isValid}
                                label="Address"
                                value={address.value}
                                onInput={(event) => { this.handleInput('address', event.target.value) }}
                                helperText={isChecked && !isValid && !address.isValid && address.errMsg}
                                variant="outlined"
                            />
                        </div>
                        <div className="div100 mt-3">
                            <div className="div30 d-inline mr-1">
                                <TextField
                                    error={isChecked && !isValid && city.errMsg && !city.isValid}
                                    label="City"
                                    value={city.value}
                                    onInput={(event) => { this.handleInput('city', event.target.value) }}
                                    helperText={isChecked && !isValid && !city.isValid && city.errMsg}
                                    variant="outlined"
                                />
                            </div>
                            <div className="div30 d-inline mr-1">
                                <TextField
                                    error={isChecked && !isValid && state.errMsg && !state.isValid}
                                    label="State"
                                    value={state.value}
                                    onInput={(event) => { this.handleInput('state', event.target.value) }}
                                    helperText={isChecked && !isValid && !state.isValid && state.errMsg}
                                    variant="outlined"
                                />
                            </div>
                            <div className="div30 d-inline mr-1">
                                <TextField
                                    error={isChecked && !isValid && zipcode.errMsg && !zipcode.isValid}
                                    label="Zipcode"
                                    value={zipcode.value}
                                    onInput={(event) => { this.handleInput('zipcode', event.target.value) }}
                                    helperText={isChecked && !isValid && !zipcode.isValid && zipcode.errMsg}
                                    variant="outlined"
                                />
                            </div>
                            <TextField
                                error={isChecked && !isValid && location.errMsg && !location.isValid}
                                select
                                label="Preferred Location"
                                value={location.value}
                                onChange={(event) => { this.handleInput('location', event.target.value) }}
                                helperText={isChecked && !isValid && !location.isValid && location.errMsg}
                                margin="normal"
                                variant="outlined"
                            >
                                <MenuItem key="das" value="A">
                                    A
                                </MenuItem>
                                <MenuItem key="das" value="B">
                                    B
                                </MenuItem>
                                <MenuItem key="das" value="C">
                                    C
                                </MenuItem>
                            </TextField>
                            <TextField
                                
                                select
                                label="Preferred Location 1 (optional)"
                                value={location1.value}
                                onChange={(event) => { this.handleInput('location1', event.target.value) }}
                                helperText={isChecked && !isValid && !location1.isValid && location1.errMsg}
                                margin="normal"
                                variant="outlined"
                            >
                                <MenuItem key="das" value="A">
                                    A
                                </MenuItem>
                                <MenuItem key="das" value="B">
                                    B
                                </MenuItem>
                                <MenuItem key="das" value="C">
                                    C
                                </MenuItem>
                            </TextField>
                            <TextField
                                
                                select
                                label="Preferred Location 2 (optional)"
                                value={location2.value}
                                onChange={(event) => { this.handleInput('location2', event.target.value) }}
                                helperText={isChecked && !isValid && !location2.isValid && location2.errMsg}
                                margin="normal"
                                variant="outlined"
                            >
                                <MenuItem key="das" value="A">
                                    A
                                </MenuItem>
                                <MenuItem key="das" value="B">
                                    B
                                </MenuItem>
                                <MenuItem key="das" value="C">
                                    C
                                </MenuItem>
                            </TextField>
                        </div>
                        <div class="div100 text-left">
                            <label>Do you have experience building and developing a team?</label>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.developTeam === 'yes'}
                                onChange={(event) => { this.handleRadioButton('developTeam','yes') }}
                                name="buildteam"
                                color="default"
                                value={this.state.developTeam}
                                aria-label="yes"  
                                />
                                Yes
                            </div>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.developTeam === 'no'}
                                onChange={(event) => { this.handleRadioButton('developTeam','no') }}
                                name="buildteam"
                                color="default"
                                value={this.state.developTeam}
                                aria-label="no"
                                />
                                No
                            </div>
                        </div>
                        <div className="div100 text-left">
                            <label>Are you ready to commit to being an owner full-time?</label>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.ownerFullTime === 'yes'}
                                onChange={(event) => { this.handleRadioButton('ownerFullTime','yes') }}
                                name="ownerfulltime"
                                value={this.state.ownerFullTime}
                                color="default"
                                aria-label="yes"
                                />
                                Yes
                            </div>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.ownerFullTime === 'no'}
                                onChange={(event) => { this.handleRadioButton('ownerFullTime','no') }}
                                name="ownerfulltime"
                                value={this.state.ownerFullTime}
                                color="default"
                                aria-label="no" 
                                />
                                No
                            </div>
                        </div>

                        <div className="div100 text-left">
                            <label>Have you ever owned and operated your own business?</label>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.operateBusiness === 'yes'}
                                onChange={(event) => { this.handleRadioButton('operateBusiness','yes') }}
                                value={this.state.operateBusiness}
                                name="business"
                                color="default"
                                aria-label="A"
                                />
                                Yes
                            </div>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.operateBusiness === 'no'}
                                onChange={(event) => { this.handleRadioButton('operateBusiness','no') }}
                                value={this.state.operateBusiness}
                                name="business"
                                color="default"
                                aria-label="B"
                                />
                                No
                            </div>
                        </div>

                        <div className="div100 text-left">
                            <label>Do you have at least 25000 MAD in available liquid assets?</label>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.liquidAssets === 'yes'}
                                onChange={(event) => { this.handleRadioButton('liquidAssets','no') }}
                                value={this.state.liquidAssets}
                                name="assets"
                                color="default"
                                aria-label="A"
                                />
                                Yes
                            </div>
                            <div class="div30 d-inline">
                                <Radio
                                checked={this.state.liquidAssets === 'no'}
                                onChange={(event) => { this.handleRadioButton('liquidAssets','no') }}
                                value={this.state.liquidAssets}
                                name="assets"
                                color="default"
                                aria-label="B"
                                />
                                No
                            </div>
                        </div>
                    </FormGroup>
                    <div class="div100 text-left">
                        <p>Becoming a Delivery Service Partner is the next level and a big commitment.</p>
                        <p class="justify">Qualifications<br/>
                        Experience hiring and developing great teams Ready to commit to being a owner
                        full-time Available liquid assets of at least 25000 MAD Previous business ownership 
                        prefered, but not required
                        The steps you'll take to launch your business Fill out a full application
                        Decide whether this is the right opportunity for you
                        Complete 2 weeks of hands-on training
                        Set up your business and build your team
                        Start delivering
                        </p>
                    </div>
                    <div class="div100 text-left">
                        <Button className={classes.btn} type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}

PartnerFinalSignUp.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(PartnerFinalSignUp);