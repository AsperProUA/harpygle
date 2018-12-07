import {combineReducers} from 'redux';
import loginData from './user';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


const reducer = combineReducers({
    loginData,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;