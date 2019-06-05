import * as ACTIONS from '../actions';
import { combineReducers } from 'redux';

function user(state={logged:false},action){
    switch (action.type) {
        case ACTIONS.LOGIN_SUCCESS:
            return {
                logged:true,
                ...action.user
            }
        case ACTIONS.LOGOUT:
            return {logged:false}
        default:
            return state;
    }
}

function getClientFormat(client){
    const {
        _id,
        name,
        code,
        business,
        address,
        email,
        cel,
        tel
    } = client;
    return  {
        _id,
        name,
        business,
        code,
        address,
        contact:{
            email,
            cel,
            tel
        }
        
    }
}

function clients(state = [], actions) {

    switch (actions.type) {
        case ACTIONS.FETCH_CLIENTS:
            return actions.clients;
        case ACTIONS.DELETE_CLIENT:
            return actions.clients.filter(client => client._id !== actions._id);
        case ACTIONS.ADD_CLIENT:            
            return [
                ...actions.clients, 
                getClientFormat(actions.client)
            ];
        case ACTIONS.UPDATE_CLIENT:
            return  actions.clients.map( (client) => {
                if(client._id === actions.client._id){
                    client = getClientFormat(actions.client);
                }
                return client;
            });
        case ACTIONS.CLEAR_CLIENTS:
            return [];
        default:
            return state;
    }
}

function status(state = {}, action) {
    switch (action.type) {
        case ACTIONS.APP_STATUS_REQUESTED:
            return {
                ...action.status
            }
        case ACTIONS.APP_STATUS_SUCCESS:
            return {
                ...action.status
            }
        case ACTIONS.APP_STATUS_FAILED:
            return {
                ...action.status
            }
        case ACTIONS.APP_STATUS_FEEDBACK:
            return {
                ...action.status
            }
        case ACTIONS.APP_STATUS_CLEAR:
            return {}
        default:
            return state;
    }
}

export default combineReducers({
    user,
    clients,
    status
})