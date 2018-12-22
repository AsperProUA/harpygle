import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import getData from '../../services/getData'
import { runInThisContext } from 'vm';

const styles = theme => ({
    root:{
        width: '100%',
        height: 'calc(100% - 100px)',
        textAlign: 'center',
    },
    btn:{
        top:'40vh',
        backgroundColor: '#25AAE1',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        '&:hover': { backgroundColor: '#2097C8' },
        margin:'auto',
        width: 382,
        height: 66,
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
    }
});

class Orders extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                storeName: { value: 'sethigoldy', },
                appSecret: { value: '41ed8e0b66de2176e1dba493bff03054', },
                apiKey: { value: 'a60c7a95ebe3e98d13f97f64bfe94f8c', },
                isValid: false,
                isChecked: false,
            },
            showConnection:true,
            orders:[],
            token:""
        }
    }

    handleInput = (name, value) => {

        this.setState(currentState => {
            currentState.form[name].value = value;
            return currentState;
        });

    }

    getOrdersData= (url) =>{
        if(localStorage.getItem("storeName") && localStorage.getItem("appSecret") && localStorage.getItem("apiKey")){
            if(url.indexOf('?') > -1){
                url+=`&storeName=${localStorage.getItem("storeName")}&appSecret=${localStorage.getItem("appSecret")}&apiKey=${localStorage.getItem("apiKey")}`
            }else{
                url+=`?storeName=${localStorage.getItem("storeName")}&appSecret=${localStorage.getItem("appSecret")}&apiKey=${localStorage.getItem("apiKey")}`
            }
        }
        const _ = this;
        getData({ url: url}).then(data => {
            console.log(data.data);
            if(data.data.shopifyURL) {
                window.location.href=data.data.shopifyURL;
            } else if(data.data.token){
                _.setState({
                    token:data.data.token
                })
                let url="getShopifyOrders?token="+data.data.token;
                url+=`&storeName=${localStorage.getItem("storeName")}&appSecret=${localStorage.getItem("appSecret")}&apiKey=${localStorage.getItem("apiKey")}`
                getData({ url: url}).then(data => {
                    _.setState({
                        orders:data.data.orders
                    },()=>{
                        console.log(this.state.orders,'order state set');
                    })
                });
            }
        });
    }
    componentDidMount(){
        var url_string = window.location.href
        var url = new URL(url_string);
        var code = url.searchParams.get("code");
        var hmac = url.searchParams.get("hmac");
        var shop = url.searchParams.get("shop");
        var state = url.searchParams.get("state");
        var timestamp = url.searchParams.get("timestamp");
        if(hmac)
            this.getOrdersData(`callback?code=${code}&hmac=${hmac}&shop=${shop}&state=${state}&timestamp=${timestamp}`);
        setTimeout(function(){

            //document.querySelector('.MainFrame-preloaderBG-4').parentElement.removeChild( document.querySelector('.MainFrame-preloaderBG-4'));
        },1000)
    }

    submitForm = (event) =>{
        const { storeName,appSecret,apiKey} = this.state.form;
        localStorage.setItem("storeName",storeName.value);
        localStorage.setItem("appSecret",appSecret.value);
        localStorage.setItem("apiKey",apiKey.value);
        this.getOrdersData(`getShopifyOrders`);
    }

    render(){
        const { classes } = this.props;
        if(this.state.showConnection && this.state.orders.length ==  0){
            if(localStorage.getItem("storeName") && localStorage.getItem("appSecret") && localStorage.getItem("apiKey") && this.state.token.length>0){
                return (
                        <div className={classes.root}>
                            <Button disabled={true}>Please Wait...</Button>
                        </div>
                    )
            }
            return(
                <div className={classes.root}>
                    <Button onClick={()=>this.setState({showConnection:false})} className={classes.btn}>Get Order data from Shopify Store</Button>
                </div>
            );
        }else if(this.state.orders.length <= 0){
            const { storeName, appSecret, apiKey, isChecked, isValid} = this.state.form;
            const { handleInput } = this;
            return (
                <Grid container spacing={0}>
                <Grid item md={3} sm={0} xs={0}>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                        <form style={{textAlign:'center'}} onSubmit={(event) => this.submitForm(event)}>
                            <h2></h2>
                            <FormGroup className={classes.formGroup}>
                                <TextField
                                    error={isChecked && !isValid && storeName.errMsg && !storeName.isValid}
                                    label="Store Name"
                                    value={storeName.value}
                                    onInput={(event) => { handleInput('storeName', event.target.value) }}
                                    helperText={isChecked && !isValid && !storeName.isValid && storeName.errMsg}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    error={isChecked && !isValid && appSecret.errMsg && !appSecret.isValid}
                                    label="App Secret"
                                    value={appSecret.value}
                                    onInput={(event) => { handleInput('appSecret', event.target.value) }}
                                    helperText={isChecked && !isValid && !appSecret.isValid && appSecret.errMsg}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    error={isChecked && !isValid && apiKey.errMsg && !apiKey.isValid}
                                    label="API Key"
                                    value={apiKey.value}
                                    onInput={(event) => { handleInput('apiKey', event.target.value) }}
                                    helperText={isChecked && !isValid && !apiKey.isValid && apiKey.errMsg}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </FormGroup>
                            <Button className={classes.submitBtn} type='submit'>Submit</Button>
                        </form>
                    </Grid>
                </Grid>
            );
        }else{
            return(
                <Grid container spacing={0}>
                <Grid item md={3} sm={0} xs={0}>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                <div>{this.state.orders.map((order,index)=>{
                    return <div key={index}>{JSON.stringify(order)}</div>
                })}</div>
                </Grid>
                </Grid>
            )
        }
    }
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Orders);