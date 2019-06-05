const low       = require('lowdb');
const FileSync  = require('lowdb/adapters/FileSync');
const adapter   = new FileSync('./src/db/db.json');
const db        = low(adapter);

db.read();

function getUser(user){
    return db.get('users').filter(user).value();
}

function getClient(client){
    return db.get('clients').filter({code:client.code}).value();
}

function addClient(client){

    let client_in_db = getClient(client);
    
    if(client_in_db.length > 0){
        return null;
    }
    
    let clients = db.get('clients');
    let _id     = clients.sortBy('_id').reverse().value()[0]._id + 1;
    let add_client = {
        _id,
        ...client,
        created: new Date(),
        updated:''
    }

    clients.push(
        add_client
    ).write();

    return add_client;
}

function updateClient(_id, client){

    let client_in_db = getClient(client);
    
    if(client_in_db.length > 0 && client_in_db[0]._id !== parseInt(client._id)){
        return null;
    }
    
    delete client._id;

    db.get('clients')
    .find({_id:parseInt(_id)})
    .assign(
        {
            ...client,
            contact:{
                ...client.contact
            },
            updated: new Date()
        }
    ).write();

    return getClient(client)[0];

}

function deleteClient(_id){
    db.get('clients').remove({_id:parseInt(_id)}).write();
}

function getAllClients(){
    return db.get('clients').value();
}

module.exports = {
    getUser,
    getAllClients,
    addClient,
    getClient,
    deleteClient,
    updateClient
}