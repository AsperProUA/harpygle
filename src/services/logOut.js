import store from '../reducers';

function logOut() {
    store.dispatch({type: 'LOGOUT_USER'});
}

export default logOut;