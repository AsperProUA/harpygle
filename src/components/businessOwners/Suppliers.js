import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import Message from '@material-ui/icons/ChatBubble';
import getData from '../../services/getData';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        margin: 26,
    },
    categories: {
        justifyContent: 'flex-start',
    },
    categoryLabel: {
        color: '#979797',
        fontSize: '20px!important ',
        fontWeight: 400,
    },
    ctegorySelected: {
        color: '#000',
        fontWeight: 'bold!important',
        fontSize: 20,
    },
    categoryItem: {
        maxWidth: 'none',
    },
    item: {
        borderRadius: '0',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
        padding: 30,
        '& p': {
            textAlign: 'left',
            color: '#979797',
            fontSize: 16,
            margin: 0,
        },
    },
    supplier: {
        color: '#25AAE1',
        margin: 12,
    },
    img: {
        width: 303,
        height: 303,
    },
    starEmpty: {
        color: '#979797',
    },
    starFill: {
        color: '#EBF223',
    },
    rate: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    between: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 35,
    },
    conect: {
        fontSize: 13,
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 25,
    },
    contactBtn: {
        fontSize: 11,
        padding: 1,
        width: 136,
        height: 19,
        minHeight: 11,
        color: '#fff',
        backgroundColor: '#25AAE1',
        fontWeight: 'bold',
        margin: '0 15px',
        '&:hover': { backgroundColor: '#2097C8' },
    }

});

////////////////////////////////////////////////////////////////////////////////////////
// this is a fake data. Delete when backend will be working
const fakeCategories = [
    'Mobiles & Tablets',
    'Electronics',
    'Appliances',
    'Health & Beauty',
    'Moms & Babies',
    'Lifestyle',
];

const fakeProducts = [
    {
        img: 'pictures/fakeData/item_XL_11871414_17506387.png',
        name: 'Honor 7S Dual SIM',
        description: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        suppliersName: 'Mohamed S.',
        suppliersId: 'kjdfstygosdgrgh',
        rate: 4,
        naturalPrice: 260,
        sale: true,
        salePrice: 60,
        quantityPerOrder: 20,
    },
    {
        img: 'pictures/fakeData/item_XL_11871414_17506387.png',
        name: 'Honor 7S Dual SIM',
        description: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        suppliersName: 'Mohamed S.',
        suppliersId: 'kjdfstygosdgrgh',
        rate: 4,
        naturalPrice: 260,
        sale: false,
        // salePrice: 60,
        quantityPerOrder: 20,
    },
    {
        img: 'pictures/fakeData/item_XL_11871414_17506387.png',
        name: 'Honor 7S Dual SIM',
        description: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        suppliersName: 'Mohamed S.',
        suppliersId: 'kjdfstygosdgrgh',
        rate: 4,
        naturalPrice: 260,
        sale: false,
        // salePrice: 60,
        quantityPerOrder: 20,
    },
    {
        img: 'pictures/fakeData/item_XL_11871414_17506387.png',
        name: 'Honor 7S Dual SIM',
        description: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        suppliersName: 'Mohamed S.',
        suppliersId: 'kjdfstygosdgrgh',
        rate: 4,
        naturalPrice: 260,
        sale: false,
        // salePrice: 60,
        quantityPerOrder: 20,
    }

];
////////////////////////////////////////////////////////////////////////////////////////

class Suppliers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            productList: fakeProducts,
            categoryList: fakeCategories,
        }
        getData({ url: 'api/categories/' }).then(data => {
            this.setState({categoryList: data.categories});
        });

        getData({ url: 'business/suppliers/' /* + &selects*/ }).then(data => {
            this.setState({productList: data.productList});
        });
    }

    changeCategory = (e, value) => {
        console.log(value)
        this.setState({ value: value });
    }

    renderRate = (rate) => {
        const { classes } = this.props;
        let starsArray = [];
        for (let i = 0; i < 5; i++) {
            if (i < rate) {
                starsArray.push(
                    <SvgIcon className={classes.starFill}>
                        <path id="star" class="cls-1" d="M27.641.52,25.688,4.48l-4.369.637A.957.957,0,0,0,20.79,6.75l3.161,3.08L23.2,14.181a.956.956,0,0,0,1.388,1.008L28.5,13.135l3.909,2.055A.957.957,0,0,0,33.8,14.181L33.048,9.83l3.161-3.08a.957.957,0,0,0-.529-1.633L31.311,4.48,29.358.52A.958.958,0,0,0,27.641.52Z" transform="translate(-20.5 0.013)" />
                    </SvgIcon>
                );
            } else {
                starsArray.push(
                    <SvgIcon className={classes.starEmpty}>
                        <path id="star" class="cls-1" d="M27.641.52,25.688,4.48l-4.369.637A.957.957,0,0,0,20.79,6.75l3.161,3.08L23.2,14.181a.956.956,0,0,0,1.388,1.008L28.5,13.135l3.909,2.055A.957.957,0,0,0,33.8,14.181L33.048,9.83l3.161-3.08a.957.957,0,0,0-.529-1.633L31.311,4.48,29.358.52A.958.958,0,0,0,27.641.52Z" transform="translate(-20.5 0.013)" />
                    </SvgIcon>
                );
            }
        }
        return (
            <div className={classes.rate}>
                {starsArray}
            </div>
        );
    }

    renderProduct = (product) => {
        const { classes } = this.props;
        return (
            <Grid item xs={12}  md={6} lg={3} >
                <Paper className={classes.item} >
                    <div className={classes.img}>
                        <img src={product.img}></img>
                    </div>
                    <p >{product.name}</p>
                    <p >{product.description}</p>
                    <p style={{ margin: '12px 0' }}>Suppliers <span className={classes.supplier}>{product.suppliersName}</span></p>
                    {this.renderRate(product.rate)}
                    <p className={classes.between}><span>Item Price</span>
                        {product.sale && (<span>
                            <span style={{ textDecoration: 'line-through' }}>
                                {product.naturalPrice} MAD
                            </span>
                            <span style={{ color: '#FCB629', marginLeft: 20 }}>
                                <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                                    {product.salePrice}
                                </span>
                                MAD
                            </span>
                        </span>)}
                        {!product.sale && (<span>{product.naturalPrice} MAD</span>)}
                    </p>
                    <p className={classes.between}><span>Min Qty. Per Oder</span><span style={{ fontWeight: 'bold' }}>{product.quantityPerOrder}</span></p>
                    <div className={classes.conect}>
                        <Button className={classes.contactBtn}>CONTACT PLEASE</Button>
                        <Message />
                        Chat Now
                    </div>
                </Paper>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        const { productList, categoryList } = this.state;
        return (
            <div className={classes.root}>
                <BottomNavigation
                    className={classes.categories}
                    showLabels
                    value={this.state.value}
                    onChange={this.changeCategory}
                >
                    {categoryList.map(category => {
                        return (<BottomNavigationAction label={category} className={classes.categoryItem} classes={{
                            selected: classes.ctegorySelected,
                            label: classes.categoryLabel,
                            root: classes.categoryRoot,
                        }} />);
                    })}
                </BottomNavigation>
                <Grid container spacing={24} className={classes.productList}>
                    {productList.map(product => {
                        return (this.renderProduct(product));
                    })}
                </Grid>
            </div>
        );
    }
}

Suppliers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suppliers);