const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = require('graphql')
cosnt Song = require('../model/song')
const lyric = require('./lyric')

const song = new GraphQLObjectType({
    name: 'song',
    fields: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        lyrics: {
            type: GraphQLList(lyric)
            resolve(parentValue, args) {
                return Song.findLyrics(parentValue.id)
            }
        }
    }
})


module.exports = song
