import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const style = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${window.location.origin}/pictures/chuttersnap-255215-unsplash.png)`,
        backgroundPosition: 'center',
    },
    header: {
        width: '100%',
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: theme.palette.common.white,
        paddingRight: '100px',
        boxSizing: 'border-box',

    },
    meet: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,.85)',
        width: '100%',
        minHeight: '100%',
        zIndex: 0,
    },
    body: {
        width: '100%',
        height: 'calc(100% - 50px)',
        zIndex: 5,
    },
    link: {
        fontSize: 20,
        padding: '30px 20px',
        color: theme.palette.common.white,
        textDecoration: 'none',
    },
    howItWork: {
        minHeight: '900px',
    },
    logo: {
        height: 'calc(50% - 40px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bodyLabel: {
        fontSize: 57,
        fontWeight: 'bold',
        color: '#FC3429',
        margin: '10px',
        textAlign: 'center',
    },
    bodyText: {
        maxWidth: '1122px',
        color: theme.palette.common.white,
        fontSize: 24,
        textAlign: 'center',
    },
    button: {
        width: '258px',
        height: '80px',
        margin: '20px 169px',
        borderRadius: '40px',
        color: theme.palette.common.white,
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'none',
    },
    paper: {
        borderRadius: 0,
        boxShadow: 'none',
        whiteSpace: 'nowrap',
        werticalAlign: 'middle',
        display: 'flex',
        alignItems: 'center',
    },
    hiwLabel: {
        textAlign: 'center',
        fontSize: 72,
        fontWeight: 200,
        color: '#636363',
    },
    badge: {
        whiteSpace: 'normal',
        paddingRight: '20px',
    },
    bageNum: {
        fontSize: 46,
        color: '#B9B9B9',
        fontWeight: 'bold',
        margin: '10px 0',
        whiteSpace: 'normal',
    },
    badgeName: {
        fontSize: 24,
        fontWeight: 'bold',
        whiteSpace: 'normal',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    about: {
        minHeight: '578px',
        backgroundColor: '#4F4F4F',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.common.white,
    },
    aboutLabel: {
        fontSize: 72,
        fontWeight: 200,
    },
    aboutText: {
        fontSize: 24,
        maxWidth: '1410px',
        margin: '20px',

    },
    footer: {
        minHeight: '246px',
        backgroundColor: '#5A5A5A',
        display: 'flex',
    },
    footerMenu: {
        color: theme.palette.common.white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
        padding: '0px 50px',
        minWidth: '200px',
        boxSizing: 'content-box',
        [theme.breakpoints.up('md')]: {
            boxSizing: 'border-box',
        },

    },
    footerMenuItem: {
        margin: '5px 0',
        fontSize: 20,
    },
    footerSocial: {

        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 0,
        flexDirection: 'row',
        margin: 'auto',
        [theme.breakpoints.up('md')]: {
            padding: '96px',
            margin: 0,
        },
    },
    socialBtn: {
        width: '40px',
        textAlign: 'center',
        margin: '15px',
    },
    footerMenuGroup: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        // minHeight: '200px',
        // [theme.breakpoints.up('md')]: {
        //     justifyContent: 'flex-start',
        // },
    }
});

function scroll() {
    return () => {
        window.location.href = window.location.hostname + '#howItWork';
    }
}

function Intro(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <div className={classes.meet}>
                <div className={classes.header}>
                    <Link to='/signin' className={classes.link}>Sign In</Link>
                    <Link to='/presign' className={classes.link}>Sign Up</Link>
                </div>
                <div className={classes.body}>
                    <div className={classes.logo}>
                        <img src={window.location.origin + '/harpygle Logo white.png'} alt='Logo white'></img>
                    </div>
                    <div className={classes.bodyContent}>
                        <p className={classes.bodyLabel}>A Reliable Young, Agile, Flexible Company</p>
                        <p className={classes.bodyText}>committed to complementing E-commerce & other business partners’ efforts for delighting their customers by offering a reliable, reasonably flexible, high-quality import and courier services.</p>
                        <div className={classes.buttonGroup}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#88C601" }}
                                className={classes.button}
                                onClick={scroll()}
                            >
                                How It Works
                            </Button>
                            <Link style={{textDecoration:'none'}} to='/presign'>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "#FFCC00" }}
                                    className={classes.button}
                                >
                                    Join Us Now
                            </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="howItWork" className={classes.howItWork}>
                <div className={classes.hiwLabel}><p>HOW IT WORKS</p></div>
                <Grid container spacing={0}>
                    <Grid item md={6} >
                        <Paper className={classes.paper} >
                            <img style={{ margin: '20px' }} src={window.location.origin + '/pictures/Intro/undraw_Container_ship_urt4 (1)@2x.png'} alt='Ship'></img>
                            <div className={classes.badge}>
                                <p className={classes.bageNum}>01</p>
                                <p className={classes.badgeName}>Buy Directly From The Supplier</p>
                                <p>Shop all products your business needs from any supplier in <span style={{ fontWeight: 'bold', whiteSpace: 'normal', }}>Morocco!</span></p>
                                <p>Holistic Shopping Experience enabling you to shop & saves you time and money. </p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={6} >
                        <Paper className={classes.paper} >
                            <img style={{ margin: '20px' }} src={window.location.origin + '/pictures/Intro/undraw_credit_card_payment_12va@2x.png'} alt='Card'></img>
                            <div className={classes.badge}>
                                <p className={classes.bageNum}>02</p>
                                <p className={classes.badgeName}>COD in Morocco</p>
                                <p><span style={{ fontWeight: 'bold' }}>Collect and Manage COD</span></p>
                                <p>We make it easy for you to get payments after delivering your products. We efficiently collect the cash that your customers pay for your products and bring it to you.</p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item sm={6} >
                        <Paper className={classes.paper} >
                            <img style={{ margin: '20px' }} src={window.location.origin + '/pictures/Intro/Group 55@2x.png'} alt='Group'></img>
                            <div className={classes.badge}>
                                <p className={classes.bageNum}>03</p>
                                <p className={classes.badgeName}>An Easy Way To Be  Your Own Boss</p>
                                <p>Full time? Part time? With Wolfepreneur you work on your own time.</p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item sm={6} >
                        <Paper className={classes.paper} >
                            <img style={{ margin: '20px' }} src={window.location.origin + '/pictures/Intro/undraw_add_to_cart_vkjp@2x.png'} alt='Cart'></img>
                            <div className={classes.badge}>
                                <p className={classes.bageNum}>04</p>
                                <p className={classes.badgeName}>Import & Sell Your Products Very Quickly To The Right Customers</p>
                                <p>Full time? Part time? With Wolfepreneur you work on your own time.</p>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.about}>
                <p className={classes.aboutLabel}>ABOUT US</p>
                <p className={classes.aboutText}>Harpygle was born as a startup in 2018 due to the increasing need of such services in the market. E-commerce was vastly growing globally and this growth was being witnessed in Morocco despite having a slower rate. With this in mind, Harpygle decided to become more of a partner to its clients rather than a service provider by solving its importing and delivery problems, being the most chronic problems of E-commerce.</p>
            </div>

            <Grid container spacing={0} className={classes.footer}>
                <Grid item sm={6} >
                    <Grid container spacing={0} className={classes.footerMenuGroup} >
                        <Grid item sm={6} className={classes.footerMenu}>
                            <p className={classes.footerMenuItem}>Terms &  Conditions</p>
                            <p className={classes.footerMenuItem}>How it works</p>
                            <p className={classes.footerMenuItem}>About us</p>
                        </Grid>
                        <Grid item sm={6} className={classes.footerMenu}>
                            <p className={classes.footerMenuItem}>Contact us</p>
                            <p className={classes.footerMenuItem}>FAQ</p>
                            <p className={classes.footerMenuItem}>Blog</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} className={classes.footerSocial}>
                    <div className={classes.socialBtn}>
                        <img src={window.location.origin + '/pictures/icons/pinterest.png'} alt='pinterest'></img>
                    </div>
                    <div className={classes.socialBtn}>
                        <img src={window.location.origin + '/pictures/icons/linkedin-in.png'} alt='linkedin'></img>
                    </div>
                    <div className={classes.socialBtn}>
                        <img src={window.location.origin + '/pictures/icons/twitter.png'} alt='twitter'></img>
                    </div>
                    <div className={classes.socialBtn}>
                        <img src={window.location.origin + '/pictures/icons/facebook-f.png'} alt='fb'></img>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
}

Intro.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Intro)