const graphql = require('graphql')
const {
    GraphQLObjectTyle,
    GraphQL,
    GraphQLString,
    GraphQLID,
} = graphql
const {mongoose} = require('../model/main')
const lyric = require('./lyric')
const song = require('./song')
const Lyric = require('../model/lyric')
const Song = require('../model/song')


const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addSong: {
            type: song,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                return (Song())
            }
        }
    }
})
