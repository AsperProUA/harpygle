import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        height: 'calc(100% - 84px)',
        width: '100%',
    },
    topBar: {
        height: 110,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
    },
    mainContent: {
        minHeight: 'calc(100% - 110px)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joinIcon: {
        backgroundImage: 'url(pictures/icons/courier/iconfinder_crew_2318458.png)',
        width: 59,
        height: 30,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        marginLeft: 40,
        marginRight: 15,
    },
    topLabel: {
        display: 'flex',
        alignItems: 'center',
        color: '#636363',
        fontSize: 22,
        fontWeight: 'bold',
    },
    btnJoin: {
        marginRight: '15%',
        backgroundColor: '#88C601',
        '&:hover': { backgroundColor: '#7BB203' },
        color: theme.palette.common.white,
        [theme.breakpoints.down('xs')]: {
            margin: 'auto',
            width: '95%',
        }
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto',
    },
    membersLabel: {
        textAlign: 'center',
        color: '#979797',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'center',
        color: '#636363',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

const fakeCompanies = [
    {
        id: 1,
        avatar: 'pictures/fakeData/poy_benbernanke.png',
        members: [
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            },
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            },
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            },
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            },
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            },
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            },
            {
                id: 1,
                avatar: 'pictures/fakeData/poy_benbernanke.png',
            }
        ]
    }
];

class JoinATeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: fakeCompanies,
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.topBar}>
                    <div className={classes.topLabel}><div className={classes.joinIcon}></div><span>Join a Team</span></div>
                    <Button className={classes.btnJoin}>Join Now</Button>
                </div>
                <div className={classes.mainContent}>
                    <Card>
                        <CardHeader
                            title="Company Name"
                            classes={{
                                title: classes.title
                            }}
                        />
                        <CardContent >
                            <Avatar src={this.state.companies[0].avatar} className={classes.bigAvatar} />
                        </CardContent>
                        <CardContent className={classes.membersLabel}>
                            <p>
                                Team Members
                            </p>
                            <div className={classes.membersContainer}>
                                {this.state.companies[0].members.map(member => {
                                    return <Avatar src={member.avatar} style={{display: 'inline-block'}} />
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

JoinATeam.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JoinATeam);