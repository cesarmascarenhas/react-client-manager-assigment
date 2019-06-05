const { GraphQLServer } = require('graphql-yoga')
const db = require('./db')

const resolvers = {
    Query:{
        clients: () => db.getAllClients(),
        exists: (parent, args) => db.getAllClients().filter(client => client.code === args.code)[0],
        login: (parent,args) => {
            if(db.getUser(args)[0] === undefined){
               throw new Error('Wrong username or password. Please, try again.');          
            } 
            return db.getUser(args)[0]
        },
        search: (parent, args) => {
           return db.getAllClients().filter( client => {
                if(
                    client.name.toLowerCase().indexOf(args.keyword.toLowerCase()) !== -1
                    ||
                    client.code.indexOf(args.keyword) !== -1
                    ||
                    client.contact.email.indexOf(args.keyword) !== -1
                ){
                    return true;
                } else {
                    return false;
                }
           })
        }
    },
    Mutation:{
        addClient: (parent, args) => {
            let client = db.addClient(args)
            if(!client){
                throw new Error('CPF/CNPJ already in use.')
            }
            return client;
        },
        deleteClient: (parent, args) => {
            db.deleteClient(args._id)
            return true;
        },
        updateClient: (parent, args) => {
            let client = db.updateClient(args._id, args)
            if(!client){
                throw new Error('CPF/CNPJ belongs to someone else.')
            }
            return client;
        }
    }
    
}

const server = new GraphQLServer(
    {
        typeDefs: 'schema.graphql',
        resolvers,
    }
)

server.start(()=>console.log('Server is running on localhost:4000'))