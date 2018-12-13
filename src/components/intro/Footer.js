import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const styles = theme => ({
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
        '& a': {
            textDecoration: 'none',
            color: 'inherit',
        }

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
    },
})

function Footer(props) {
    const { classes } = props;

    return (
        <Grid container spacing={0} className={classes.footer}>
            <Grid item sm={6} >
                <Grid container spacing={0} className={classes.footerMenuGroup} >
                    <Grid item sm={6} className={classes.footerMenu}>
                        <p className={classes.footerMenuItem}><Link to='/termsandconditions'>Terms &  Conditions</Link></p>
                        <p className={classes.footerMenuItem}><Link to='/#howItWork'>How it works</Link></p>
                        <p className={classes.footerMenuItem}><Link to='/'>About us</Link></p>
                    </Grid>
                    <Grid item sm={6} className={classes.footerMenu}>
                        <p className={classes.footerMenuItem}><Link to='/contactus'>Contact us</Link></p>
                        <p className={classes.footerMenuItem}><Link to='/faq'>FAQ</Link></p>
                        <p className={classes.footerMenuItem}><Link to='/blog'>Blog</Link></p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6} className={classes.footerSocial}>
                <div className={classes.socialBtn}>
                    <a href='https://instagram.com/harpygle'><img src={window.location.origin + '/pictures/intro/Group 354.png'} alt='instagram'></img></a>
                </div>
                <div className={classes.socialBtn}>
                    <a href='https://facebook.com/harpygle'><img src={window.location.origin + '/pictures/intro/Group 353.png'} alt='fb'></img></a>
                </div>
            </Grid>
        </Grid>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)