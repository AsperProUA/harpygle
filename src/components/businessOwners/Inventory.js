import React, { Component } from 'react';
import axios from 'axios';
import apiPath from '../../services/apiPath';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableRow, TableHead, TableCell, TableBody, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import getData from '../../services/getData';
import { Link } from 'react-router-dom';

import UserInfo from '../globalComponents/UserInfo';
import products from '../products';

const styles = theme => ({
    row: {
        // padding:'20px 5px',
    },
    photo: {
        width: 100,
        height: 100,
        padding: 5,
        textAlign: 'center',
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
        }
    },
    td: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            padding: 4,
        }
    },
    numberInput: {
        minWidth: 33,
    },
    user: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 5,
        alignItems: 'center',
        marginBottom: 40,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '0 20px',
        color: '#636363'
    },
    city: {
        fontSize: 18,
        color: '#979797',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 400,
    },
    orders: {
        textAlign: 'center',
    },
    orderLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#979797',
    },
    ordersType: {
        fontSize: 12,
        color: '#979797',
        margin: '15px auto',
        fontWeight: 400,
    },
    ordersCount: {
        fontSize: 30,
        color: '#979797',
        fontWeight: 'bold',
        margin: '25px auto',
    },
    hrLight: {
        border: '0.5px solid #E9E9E9',
        margin: '20px auto',
        width: '80%'
    },
    iconMap: {
        backgroundImage: 'url("pictures/icons/business/map-marker-alt.png")'
    },
    icon: {
        width: 32,
        height: 32,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 1,
        display: 'inline-block',
    },
    userBadge: {
        [theme.breakpoints.up('sm')]: {
            order: 5,
        },
    },
    paper: {
        padding: 15,
    },
    btn: {
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        width: 250,
        '&:hover': {
            backgroundColor: '#7BB203',
        },
    }
})

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            user: {
                completedOrders: 13,
                inProgressOrders: 2,
            },
        }
    }

    changeQuantity = (id, value) => {
        let index = this.state.products.findIndex((product) => {
            return product.productRequestID == id;
        });
        if(index !== -1){
            this.setState(currentState => {
                currentState.products[index].reqAmount = value;
                return currentState;
            });
            axios.put(`${apiPath}business/productrequest/${id}`, {reqAmount: value});
        }
    }

    componentDidMount() {
        getData({url: `business/productrequest/getbyownerid/${this.props.user.id}`}).then(response=>{
            console.log(response);
            this.setState({products: response.data});
        })
    }

    render() {
        const { products } = this.state;
        const { classes, user } = this.props;
        return (
            <Grid container spacing={0} >
            <Grid item xs={12} style={{padding: 20}}>
                <Link to='/addnewproduct' style={{textDecoration: 'none'}}><Button className={classes.btn}> Add New product</Button></Link>
            </Grid>
                <Grid item sm={4} xs={12} md={4} lg={3} className={classes.userBadge}>
                    <Paper className={classes.paper}>
                        <UserInfo/>
                        <div>
                            <hr className={classes.hrLight} />
                            <div className={classes.city}>
                                <span className={[classes.icon, classes.iconMap].join(' ')}></span><span style={{ marginLeft: 15 }}>{user.city}</span>
                            </div>
                            <hr className={classes.hrLight} />
                            <div className={classes.orders}>
                                <p className={classes.orderLabel}>MY ORDERS</p>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            Complete
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.state.user.completedOrders}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.ordersType}>
                                            In Progress
                                        </div>
                                        <div className={classes.ordersCount}>
                                            {this.state.user.inProgressOrders}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={9}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.td}></TableCell>
                                    <TableCell className={classes.td}>Product Name</TableCell>
                                    <TableCell className={classes.td}>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map(product => {
                                    return (
                                        <TableRow className={classes.row} key={product.productRequestID}>
                                            <TableCell className={classes.td} style={{width: 110}}><div className={classes.photo}><img src={product.imgUrls[0]}></img></div></TableCell>
                                            <TableCell className={classes.td}>{product.name}<br />{product.description}</TableCell>
                                            <TableCell className={classes.td} style={{width: 110}}>
                                                <TextField
                                                    InputProps={{
                                                        inputProps: { min: 0, max: 1000 },
                                                        classes: { input: classes.numberInput }
                                                    }}
                                                    value={product.reqAmount}
                                                    // onChange={this.handleChange('age')}
                                                    type="number"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    margin="normal"
                                                    variant="outlined"
                                                    onInput={(event) => this.changeQuantity(product.productRequestID, event.target.value)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

Inventory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    })
)(Inventory));