import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RateToStars from '../globalComponents/RateToStars';
import Button from '@material-ui/core/Button';
import Message from '@material-ui/icons/ChatBubble';
import getData from '../../services/getData';

const styles = theme => ({
    root: {
        width: '100%',
    },
    tabRoot: {
        maxWidth: '100vw',
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            maxWidth: 'calc(100vw - 240px)',
            width: 'calc(100vw - 240px)',
        },
        display: 'inline-block',
    },
    tabs: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        maxWidth: '100%',
    },
    indicator: {
        backgroundColor: 'rgba(0,0,0,0)',
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
        position: 'relative',
        width: '100%',
        height: 303,
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
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
    },
    saleLabel: {
        position: 'absolute',
        top: '-15px',
        width: '110%',
        left: '-5%',
        backgroundColor: '#FF5400',
        height: 46,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: '46px',
    }

});

////////////////////////////////////////////////////////////////////////////////////////
// this is a fake data. Delete when backend will be working
const fakeCategories = [
    {
        id: 0,
        name: 'All Categories',
    },
    {
        id: 1,
        name: 'Mobiles & Tablets'
    },
    {
        id: 2,
        name: 'Electronics',
    },
    {
        id: 3,
        name: 'Appliances',
    },
    {
        id: 4,
        name: 'Health & Beauty',
    },
    {
        id: 5,
        name: 'Moms & Babies',
    },
    {
        id: 6,
        name: 'Lifestyle',
    },
];

const fakeProducts = [
    {
        id: 'asdf1',
        imgUrls: ['pictures/fakeData/item_XL_11871414_17506387.png'],
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
        id: 'asdf2',
        imgUrls: ['pictures/fakeData/item_XL_11871414_17506387.png'],
        name: 'Honor 7S Dual SIM',
        description: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        suppliersName: 'Mohamed S.',
        suppliersId: 'kjdfstygosdgrgh',
        rate: 4,
        naturalPrice: 260,
        salePrice: 60,
        quantityPerOrder: 20,
    },
    {
        id: 'asdf3',
        imgUrls: ['pictures/fakeData/item_XL_11871414_17506387.png'],
        name: 'Honor 7S Dual SIM',
        description: '16GB, 2GB RAM, 4G LTE, Sapphire Blue',
        suppliersName: 'Mohamed S.',
        suppliersId: 'kjdfstygosdgrgh',
        rate: 4,
        naturalPrice: 260,
        salePrice: 60,
        quantityPerOrder: 20,
    },
    {
        id: 'asdf4',
        imgUrls: ['pictures/fakeData/item_XL_11871414_17506387.png'],
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
            currentTab: 0,
            value: 0,
            productList: fakeProducts,
            categoryList: fakeCategories,
        }
        getData({ url: 'api/categories/' }).then(data => {
            this.setState({ categoryList: data.categories });
        });
    }

    componentDidMount() {
        this.getProgucts('supplier/products');
    }

    changeCategory = (e, value) => {
        (value === 0) ?
            this.getProgucts('supplier/products') :
            this.getProgucts(`supplier/product/getbycategory/${this.state.categoryList[value].name}`);
        this.setState({ currentTab: value });
    }

    getProgucts = (category) => {
        console.log(category);
        getData({ url: category }).then(response => {
            this.setState({ productList: response.data });
        });
    }

    renderProduct = (product) => {
        const { classes } = this.props;
        console.log(product)
        return (
            <Grid key={product.productID} item xs={12} sm={6} md={6} lg={3} >
                <Paper className={classes.item} >
                    <div className={classes.img} style={{ backgroundImage: `url(${product.imgUrls[0]})` }}>
                        {product.salePrice && <span className={classes.saleLabel}>SALE</span>}
                    </div>
                    <p >{product.name}</p>
                    <p >{product.description}</p>
                    <p style={{ margin: '12px 0' }}>Suppliers <span className={classes.supplier}>{product.suppliersName}</span></p>
                    <RateToStars rate={product.rate} />
                    <p className={classes.between}><span>Item Price</span>
                        {product.salePrice && (<span>
                            <span style={{ textDecoration: 'line-through' }}>
                                {product.price} MAD
                            </span>
                            <span style={{ color: '#FCB629', marginLeft: 20 }}>
                                <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                                    {product.salePrice}
                                </span>
                                MAD
                            </span>
                        </span>)}
                        {!product.salePrice && (<span>{product.price} MAD</span>)}
                    </p>
                    <p className={classes.between}><span>Min Qty. Per Oder</span><span style={{ fontWeight: 'bold' }}>{product.minQuantity}</span></p>
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
        const { productList, categoryList, currentTab } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.tabRoot}>
                    <Tabs
                        className={classes.tabs}
                        value={currentTab}
                        onChange={this.changeCategory}
                        classes={{
                            indicator: classes.indicator,
                            flexContainer: classes.container,
                        }}
                        scrollable
                        scrollButtons="auto"
                    >
                        {categoryList.map(category => {
                            return <Tab key={category.id} label={category.name} classes={{
                                selected: classes.ctegorySelected,
                                label: classes.categoryLabel,
                                root: classes.categoryRoot,
                            }} />
                        })}
                    </Tabs>
                </div>
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