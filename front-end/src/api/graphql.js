export const clients =  `
    query{
        clients{
            _id,
            name,
            code,
            address,
            business,
            contact {
                email,cel,tel
            }
        }
    }
`

export const login = (user,pass) => {
    return `
        query{
            login(username: "${user}", password: "${pass}"){
                _id, username, role
            }
        }
    `
}

export const search = (keyword = "") => `
    query{
        search(keyword:"${keyword}"){
            _id,
            name,
            code,
            address,
            business,
            contact {
                email,cel,tel
            }
        }
    }
`

export const add = (client) => {
    return `
    mutation{
        addClient(
            name: "${client.name}",
            business: ${client.business},
            code: "${client.code}",
            address: "${client.address}",
            contact:{
                email: "${client.email}",
                cel: "${client.cel}",
                tel: "${client.tel}"
            }
        ){
            _id
        }
      }
    `
}

export const update = (client) => {
    return `
        mutation {
            updateClient(
                _id: ${client._id},
                name: "${client.name}",
                business: ${client.business},
                code: "${client.code}",
                contact: { 
                    email: "${client.email}"
                    cel: "${client.cel}", 
                    tel:"${client.tel}" 
                }
            ){
                _id,
                name,
                business,
                code,
                contact{
                    email,
                    cel,
                    tel
                }
            }
        }
    `
}

export const remove = (_id) => {
    return `
        mutation{
            deleteClient(
            _id:"${_id}"
            )
        }
    `
}