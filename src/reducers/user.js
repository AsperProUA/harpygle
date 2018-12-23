const emptyState = {
    isLoggedIn: false,
    isLoad: false,
    user: {},
};

let initialState;

localStorage['appState'] && (initialState = JSON.parse(localStorage['appState']));

export default function loginData(state = initialState || emptyState, action) {
    
    if ('LOGIN_USER' == action.type){
        let newState = {... state}
        newState.isLoggedIn = action.payload.isLoggedIn;
        newState.user = action.payload.user;
        localStorage["appState"] = JSON.stringify(newState);
        //this.props.history.push('/welcome')
        if (action.payload.user.role === "partners"){
            window.location.href = window.location.origin + '/welcome';
        }        
        return state = newState;
    } else if('USER_DATA' == action.type){
        let newState = {... state}
        newState.user = {...newState.user, ...action.payload};
        localStorage["appState"] = JSON.stringify(newState);
        return newState;
    } else if('LOGOUT_USER' == action.type){
        localStorage["appState"] = JSON.stringify(emptyState);
        return emptyState;
    } else if('LOAD_START' == action.type){
        let newState = {... state}
        newState.isLoad = true;
        return state = newState;
    } else if('LOAD_END' == action.type){
        let newState = {... state}
        newState.isLoad = false;
        return state = newState;
    }
    return state;
}