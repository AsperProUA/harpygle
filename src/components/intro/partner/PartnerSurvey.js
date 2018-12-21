import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../../../css/partner.css';

import Header from '../Header';

const style = theme => ({
    root: {
        width: '100%',
        height: '100vh',
    },
    body: {
        position: 'relative',
        padding: '0 50px',
        paddingTop: '90px',
        minHeight: 'calc(100% - 130px)',
        width: '100%',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            padding: '10px',
            paddingTop: '5px',
        },
    },
    item: {
        padding: '0 35px',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            margin: 'auto',
        },
        height: '100%',
    },
    paper: {
        border: 'none',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
        borderRadius: 0,
        padding: '68px 0',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '10px',
            marginBottom: '20px',
            minWidth: '210px',
        },
        whiteSpace: 'nowrap',
        '& div': {
            width: '164px',
            height: '164px',
            margin: 'auto',
        },
        '& button': {
            backgroundColor: '#88C601',
            color: theme.palette.common.white,
            margin: '37px 0',
            width: 250,
            '&:hover': {
                backgroundColor: '#7BB203',
            }
        },
        '& a': {
            textDecoration: 'none',

        }
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#707070',
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#979797',
    },
    modalBg: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxBorder:{
        boxShadow: '0 0 10px #ccc'
    }
    
});

class partner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            currentRegistered: null,
        }
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Header />
                <div class="pcontent-box">
                <div class="prow">
                    <div class="pdiv50 pm-auto">
                        <div class="pdiv100 ptext-center pmt-3">
                            <h4><b>Start your own business and earn with Harpygle</b></h4>
                        </div>				
                        <div class="pdiv100 pmt-2">
                            <div class="prow response top">
                                <div class="pdiv60 d-inline">
                                    <h6>Successful owners can expect</h6>                                    
                                    <p class="pm-2">1. Startup cost as low as 25,000 MAD</p>
                                    <p class="pm-2">2. Annual revenue potential 3M-7.5M MAD</p>
                                    <p class="pm-2">3. Annual Profit potential 750K-2.5M MAD</p>
                                    
                                </div>		
                                <div class="pdiv40 d-inline imgTool ptext-right">
                                    <img style={{ verticalAlign:'super' }} src="./pictures/partner/image.png"></img>
                                </div>				
                            </div>					
                        </div>
                    </div>
                </div>
                <div class="prow  pmt-2 pp-2 pbox-border">
                    <div class="pdiv80 pm-auto ptext-center">
                        <img src="./pictures/partner/hand.png"></img>
                        <h6 class="pmt-3">Why being a partner with us ?</h6>
                        <p class="pmt-3">if you want to start your own business and loves coaching teams in a high speed, ever-changing enviroment, becoming a Harpygle Delivery Service Partner is an ideal opportunity for you. As an owner, you will operate with 25-50 vans and have 50-100 employees. You'll be fully responsible for hiring and developing a team ogf high-performing, hardowrking drivers, while we take care of gettiing you set up and ready to operate out of an Harpygle delivery station in your city. You'll be expected to provide consistent coaching and support for your team to ensure the succesfull delivery of packages in a 7 days/week, 365 days/year.</p>
                    </div>
                </div>
                <div class="prow pmt-2 pp-2 pbox-border">
                    <div class="pdiv80 pm-auto ptext-center">
                        <img src="./pictures/partner/user.png"></img>
                        <h6 class="pmt-3">Are you a true team leader ?</h6>
                        <p class="pmt-3">The hardest oart of being a successful owner is hiring, training and managing a high performance team. Owing a package delivery business takes strong leadership along with a lot of grit and hard work as you lead your team to deliver thousands of packages to happy customers every day. if that's your expertise, bring your leadership skills, and we will provice you with all of the technology and operational support you'll need</p>
                    </div>
                </div>
                <div class="prow pp-2">
                    <div class="pdiv100 ptext-center">
                        <h4>What you do </h4>
                        <h6 class="mt-1">Only 4 simple</h6>
                        <div class="prow pmt-2 response">
                            <div class="pwidth25 pdiv-grid ptext-center pbox-border pp-2 pmr-1">
                                <div class="pdiv100">
                                    <h6>1. Set up your busniness</h6>
                                </div>
                                <div class="pdiv100 pmt-5">
                                    <img src="./pictures/partner/card.png" class="pimgGrid"></img>
                                </div>		
                            </div>
                            <div class="pwidth25 pdiv-grid ptext-center pbox-border pp-2 pmr-1">
                                <div class="pdiv100">
                                    <h6>2. Build your team</h6>
                                </div>
                                <div class="pdiv100 pmt-5">
                                    <img src="./pictures/partner/people.png"  class="pimgGrid"></img>
                                </div>		
                            </div>
                            <div class="pwidth25 pdiv-grid ptext-center pbox-border pp-2 pmr-1">
                                <div class="pdiv100">
                                    <h6>3. Deliver Packages</h6>
                                </div>
                                <div class="pdiv100 pmt-5">
                                    <img src="./pictures/partner/gift.png"  class="pimgGrid"></img>
                                </div>		
                            </div>
                            <div class="pwidth25 pdiv-grid ptext-center pbox-border pp-2 pmr-1">
                                <div class="pdiv100">
                                    <h6>4. Grow your business</h6>
                                </div>
                                <div class="pdiv100 pmt-5">
                                    <img src="./pictures/partner/building.png"  class="pimgGrid"></img>
                                </div>		
                            </div>
                        </div>
                    </div>
                </div>
                <div class="prow">
                    <div class="pdiv50 pm-auto">
                        <div class="prow response">
                            <div class="pdiv40 d-inline newDiv20">
                                <h6>What we support</h6>
                                <p class="pm-2">1. Get you started</p>
                                <p class="pm-2">2. Provide Training</p>
                                <p class="pm-2">3. Give you a comprehensive toolkit</p>
                                <p class="pm-2">4. Share your experience</p>
                                
                            </div>		
                            <div class="pdiv50 pt-3 d-inline ptext-right imgTool">
                                <img style={{ verticalAlign:'super' }} src="./pictures/partner/support.png" class="pimgSupport"></img>
                            </div>				
                        </div>	
                    </div>
                </div>
                <div class="prow pp-4 response">
                    <div class="pdiv100 ptext-center newButton1">
                        <Link to='/partner/presignup'>
                            <button class="btn btn-story">START YOUR SUCCESS STORY NOW</button>
                        </Link>                        
                    </div>			
                </div>
            </div>
        </div>
        );
    }
}

partner.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(partner);