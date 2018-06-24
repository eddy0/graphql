const { GraphQLObjectType,
        GraphQLString,
        GraphQLID,
        GraphQLList,
        GraphQLInt,
        } = require('graphql')

const song = require('./song')
const Lyric = require('../model/lyric')

const lyric = new GraphQLObjectType({
    name: 'lyric',
    fields: {
        id: {type: GraphQLID},
        likes: {type: GraphQLInt},
        content: {type: GraphQLString},
        song: {
            type: song,
            resolve(parentValue, args) {
                return Lyric.findById(parentValue.id).populate('song')
                            .then((lyric) => {
                                console.log('lyric', lyric)
                                return lyric.song
                            })
            }
        }
    }
})


module.exports = lyric
