import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/CheckCircle';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';



const style = theme => ({
    avatar: {
        width: 101,
        height: 101,
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '50%',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20px',
        '& button': {
            width: 214,
            height: 60,
            margin: '20px 0',
            backgroundColor: '#88C601',
            color: theme.palette.common.white,
            '& svg': { marginRight: 10 },
            '&:hover': { backgroundColor: '#7BB203' },

        },
        '&.secondaryBtn': {
            backgroundColor: 'inherit',
        },
    },
    removeImgText: {
        color: '#88C601',
        display: 'flex',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        '& svg': { marginRight: 10 },
    },
    secondaryText: {
        color: '#979797',
        fontSize: 18,
        fontWeight: 'bold',
    },
    shopify: {
        display: 'flex',
        width: 280,
        justifyContent: 'space-between',
        fontSize: 16,
        marginBottom: 16,
    },
    accountId: {
        display: 'flex',
        width: 280,
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        padding: '20px',
    },
    url: {
        width: 280,
        padding: '35px 20px',
        textAlign: 'left',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
    },
    formGroup: {
        width: 320,
        margin: 'auto',
        textAlign: 'left',
        padding: '35px 0',
        '& label': {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#979797',
            margin: '18px',
        },
        '& input': {
            padding: '12px 22px',
            borderRadius: '6px',
            border: '1px solid #D0D0D0',
        }
    },
    submitBtn:{
        width: 214,
        height: 60,
        margin: '20px 0',
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
    },
    defaultAvatar: {
        backgroundImage: `url(${defaultAvatar})`,
    }
});

const defaultAvatar = 'pictures/poy_benbernanke.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: null,
                avatar: null,
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={0}>
                <Grid item md={6} className={classes.column}>
                    {this.state.user.avatar ? <div className={classes.avatar}>Img</div> : <div className={[classes.avatar ,classes.defaultAvatar].join(' ')}></div>}
                    <Button><PhotoIcon /> Change Image</Button>
                    <p className={classes.removeImgText}><ClearIcon /> REMOVE IMAGE</p>
                    <div className={classes.accountId}>
                        <p className={classes.removeImgText}><CheckIcon /><span className={classes.secondaryText}>Your Account Is Verified</span></p>
                        <Button style={{ width: 261 }} >Update Your ID Number</Button>
                    </div>

                    <div className={classes.url}>
                        <div className={classes.shopify}><span><img src='/pictures/icons/preview.png'></img> Shopify URL </span><span>Edit</span></div>
                        https://egypt.souq.com/
                    </div>
                    <div className={classes.accountId} style={{ paddingBottom: 0 }}>
                        <Button style={{ backgroundColor: 'inherit', color: '#979797', fontSize: 14, margin: 0, textTransform: 'none' }}>Delete account</Button>
                    </div>
                </Grid>
                <Grid item md={6}>
                    <form>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel>
                                Email Address<br />
                                <Input fullWidth placeholder='example@mail.com' type='email'>
                                </Input>
                            </FormLabel>
                            <FormLabel>
                                Sequrity Question<br />
                                <Input fullWidth placeholder='What are you favorite color' >
                                </Input>
                            </FormLabel>
                            <FormLabel>
                                Sequrity Answer<br />
                                <Input fullWidth placeholder='Red'>
                                </Input>
                            </FormLabel>
                            <FormLabel>
                                Current Password<br />
                                <Input fullWidth placeholder='Type you password' type='password'>
                                </Input>
                            </FormLabel>
                            <FormLabel>
                                New Password<br />
                                <Input fullWidth type='password' placeholder='Type you password'>
                                </Input>
                            </FormLabel>
                        </FormGroup>
                        <FormGroup>
                            <Button className={classes.submitBtn}>Submit</Button>
                        </FormGroup>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Profile);