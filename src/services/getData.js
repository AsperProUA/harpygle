import apiPath from './apiPath';
import axios from 'axios';
import store from '../reducers';

function getData( data ){
    
    store.dispatch({type: 'LOAD_START'});
    return new Promise((resolve) => {
        axios.get(apiPath + data.url,
            { headers: 
                { 
                    "Access-Control-Allow-Origin": "*" 
                }
            }
        ).then((response) => {

            if (/*response.data.auth*/true) {
                store.dispatch({type: 'LOAD_END'});
                return resolve(response);
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == '401') {
                    //this.logoutUser();
                }
                if (error.response.status == '403') {
                    ///////////////////////////////////////
                }
            } else {
                console.log(error);
            }
            store.dispatch({type: 'LOAD_END'});
        });
    });
}

export default getData;