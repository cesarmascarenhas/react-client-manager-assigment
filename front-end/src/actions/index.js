import * as API from '../api';
import * as ACTIONS from '../actions';

//USER ACTIONS
export const LOGIN_REQUESTED        = "LOGIN_REQUESTED";
export const LOGIN_SUCCESS          = "LOGIN_SUCCESS";
export const LOGIN_FAILED           = "LOGIN_FAILED";
export const LOGOUT                 = "LOGOUT";
//CLIENTS ACTIONS
export const FETCH_CLIENTS          = "FETCH_CLIENTS";
export const ADD_CLIENT             = "ADD_CLIENT";
export const DELETE_CLIENT          = "DELETE_CLIENT";
export const UPDATE_CLIENT          = "UPDATE_CLIENT";
export const CLEAR_CLIENTS          = "CLEAR_CLIENTS";
//STATUS ACTIONS
export const APP_STATUS_REQUESTED   = "APP_STATUS_REQUESTED";
export const APP_STATUS_SUCCESS     = "APP_STATUS_SUCCESS";
export const APP_STATUS_FAILED      = "APP_STATUS_FAILED";
export const APP_STATUS_CLEAR       = "APP_STATUS_CLEAR";
export const APP_STATUS_FEEDBACK    = "APP_STATUS_FEEDBACK";



export const searchClients = (keyword = "") => {    
    return function( dispatch ){
        dispatch(request())
        API.fetchClients(keyword)
        .then( res => {
            if(res.errors){
                throw res.errors[0].message;
            }
            dispatch(clearStatus())
            dispatch({
                type:ACTIONS.FETCH_CLIENTS,
                clients:res.data.search
            });
            
        })
        .catch(error => {
            dispatch({
                type:ACTIONS.APP_STATUS_FAILED,
                msg:error
            })
        })
    }    
}

export const login = (user,pass) => {
    return function( dispatch ){
        dispatch(request())
        API.login(user,pass)
        .then( res => {
            if(res.errors){
               throw res.errors[0].message;
            }
            dispatch(clearStatus())
            dispatch({
                type:ACTIONS.LOGIN_SUCCESS,
                user:res.data.login
            });
           
        })
        .catch( error => {
            dispatch(failed(error))
        })
    }
}

export const addClient = (clients, client, callback) => {
    return function( dispatch ){
        dispatch(request())
        API.addClient(client)
        .then( res => {
            if(res.errors){
               throw res.errors[0].message;
            }
            dispatch(clearStatus())
            dispatch({
                type:ACTIONS.ADD_CLIENT,
                clients,
                client:{ _id:res.data.addClient._id, ...client }
            });
            dispatch(feedback('New entry successfully added.'))
            callback();
           
        })
        .catch( error => {
            dispatch(failed(error))
        })
    }
}

export const updateClient = (clients, client, callback) => {
    return function( dispatch ){
        dispatch(request())
        API.updateClient(client)
        .then( res => {
            if(res.errors){
               throw res.errors[0].message;
            }

            dispatch(clearStatus())
            dispatch({
                type:ACTIONS.UPDATE_CLIENT,
                clients,
                client
            });
            dispatch(feedback('Successfully updated.'))
            callback();
           
        })
        .catch( error => {
            dispatch(failed(error))
        })
    }
}

export const removeClient = ( clients, _id, callback = ()=>{} ) => {
    return function( dispatch ){
        API.removeClient(_id)
        .then( res => {
            if(!res.data){
               throw res.errors[0].message;
            }
            dispatch({
                type:ACTIONS.DELETE_CLIENT,
                clients,
                _id
            });
            callback();
           
        })
        .catch( error => {
            dispatch(failed(error))
        })
    }
}
export function clearClients(){
    return {
        type:CLEAR_CLIENTS
    }
}
export function clearUser(){
    return {
        type:LOGOUT
    }
}

export function logout(callback){
    return function( dispatch ){
        dispatch(clearClients());
        dispatch(clearUser());
        callback();        
    }
    
}

// GLOBAL STATUS
export const request = () => {
    return {
        type:APP_STATUS_REQUESTED,
        status:{ requested:true }
    }
}

export const failed = (msg) => {
    return {
        type:APP_STATUS_FAILED,
        status:{ failed:true, msg:msg }
    }
}

export const feedback = (msg) => {
    return {
        type:APP_STATUS_FEEDBACK,
        status:{ feedback:true, msg:msg }
    }
}

export function clearStatus(){
    return {
        type:APP_STATUS_CLEAR
    }
}