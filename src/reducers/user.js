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
        return state = newState;
    } else if('USER_DATA' == action.type){
        let newState = {... state}
        newState.user.name = action.payload.name;
        newState.user.avatar = action.payload.avatar;
        newState.user.city = action.payload.city;
        localStorage["appState"] = JSON.stringify(newState);
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