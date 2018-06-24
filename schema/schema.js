const graphql = require('graphql')
const log = console.log.bind(console)

const axios = require('axios')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
        GraphQLSchema} = graphql

const companyType = new GraphQLObjectType({
    name: 'company',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        users: {
            type: new GraphQLList(userType),
            resolve(parentValue, args) {
                log(parentValue, args)
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then((res) => res.data)
            }
        }
    })
})


const userType = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: companyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then((res) => res.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)  },
                age: {type: new GraphQLNonNull(GraphQLInt) },
                companyId: {type: GraphQLString},
            },
            resolve: (parentValue, args) => {
                return axios.post('http://localhost:3000/users', {...args} ).
                then((res) => res.data)
            }
        },
        deleteUser: {
            type: userType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (parentValue, args) => {
                log(parentValue, args)
                return axios.delete(`http://localhost:3000/users/${args.id}` )
                            .then((res) => res.data)
            }
        },
        updateUser: {
            type: userType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString) },
                name: {type: GraphQLString  },
                age: {type: GraphQLInt },
                companyId: {type: GraphQLString},
            },
            resolve: (parentValue, args) => {
                log(parentValue, args)
                return axios.patch(`http://localhost:3000/users/${args.id}`, args )
                            .then((res) => res.data)
            }
        },

    }
})

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                            .then((res) => res.data)
            }

        },
        company: {
            type: companyType,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                            .then((res) => res.data)
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation,
})


module.exports = schema
