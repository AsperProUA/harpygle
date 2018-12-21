import axios from 'axios';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getData from '../../../services/getData';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbar from '../../globalComponents/CustomizedSnackbar';
import AddIcon from '@material-ui/icons/Add';
import NewOrder from './NewOrder';

const style = theme => ({
    root: {
        backgroundColor: theme.palette.error.dark,
        padding: 50,
        // textAlign: 'center',
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
            padding: '50px 9px',
        },
    },
    btn: {
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        marginBottom: 50,
        width: 250,
        '&:hover': {
            backgroundColor: '#7BB203',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    formControl: {
        alignItems: 'flex-start',
    },
    group: {
        flexDirection: 'row',
        color: '#979797',
    },
    divider: {
        width: '45%',

    },
    btnAdd: {
        fontSize: 18,
        height: 60,
        alignSelf: 'flex-end',

    },
    topForm: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    leftColumn: {
        paddingRight: 50,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    rightColumn: {
        paddingLeft: 50,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    }
});

class SheduleANewOrder extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            orders: [],
            snackOpen: false,
            snackMessage: {
                key: 1,
                message: '',
            },
            snackVariant: '',
            preventProducts: [],
        }
    }

    componentDidMount() {
        getData({ url: `business/productrequest/getbyownerid/${this.props.user.id}` }).then(response => {
            let productNames = response.data.map(product=> ({label: product.name}));
            this.setState({preventProducts: productNames})
        });
        this.addOrder();
    }

    changeSnack = (snackData) => {
        console.log(snackData);
        this.setState(state => {
            state.snackOpen = true;
            state.snackMessage = snackData.snackMessage;
            state.snackVariant = snackData.snackVariant;
            return state;
        });
    }

    closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackOpen: false, });
    };

    handleClickAway = () => {
        this.props.close();
    }

    addOrder = () => {
        this.setState(state => {
            state.orders.push(<NewOrder preventProducts={this.state.preventProducts} snackData={this.changeSnack} key={state.orders.length} />);
            return state
        });
    }

    render() {

        const { classes } = this.props;
        const { orders, snackVariant, snackOpen, snackMessage } = this.state;
        return (
            <div>
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
                <div style={{ width: '100%', textAlign: 'right', paddingRight: 25 }}>
                    <Button className={[classes.btnAdd, classes.btn].join(' ')} onClick={this.addOrder}> <AddIcon />ADD ORDER</Button>
                </div>
                {orders.map((order) => {
                    return order;
                })}
            </div >
        );
    }
}

SheduleANewOrder.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(
    state => ({
        user: state.loginData.user,
    })
)(withStyles(style)(SheduleANewOrder));