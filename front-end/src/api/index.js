import * as GraphQL from './graphql';
import { sleep }  from '../helpers'

const endpoint  = 'http://localhost:4000';
const method    = 'POST';
const headers   = {
    "Content-Type":"application/graphql"
}

export const fetchClients = async (keyword) => {
    await sleep(500);
    return await fetch(endpoint, { method, headers, body:GraphQL.search(keyword) } ).then(res => res.json());   
}

export const login = async (user,pass) => {
    await sleep(500);
    return await fetch(endpoint, { method, headers, body:GraphQL.login(user,pass) } ).then(res => res.json());   
}

export const removeClient = async (_id) => {
    await sleep(1000);
    return await fetch(endpoint, { method, headers, body:GraphQL.remove(_id) } ).then(res => res.json());   
}

export const addClient = async (client) => {
    await sleep(1000);
    return await fetch(endpoint, { method, headers, body:GraphQL.add(client) } ).then(res => res.json());   
}

export const updateClient = async (client) => {
    await sleep(1000);
    return await fetch(endpoint, { method, headers, body:GraphQL.update(client) } ).then(res => res.json());   
}