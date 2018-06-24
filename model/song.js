const {log} = require('../utils')
const {mongoose, Model} = require('./main')

const Schema = mongoose.Schema

const songSchema = new Schema({
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    lyrics: [{
        type: Schema.Types.ObjectId,
        ref: 'lyric'
    }]
})

songSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id)
            .then((song) => {
                  const lyric = new Lyric({ content, song })
                  song.lyrics.push(lyric)
                  return Promise.all([lyric.save(), song.save()])
                    .then(([lyric, song]) => song)
                })
}

songSchema.statics.findLyrics = function(id) {
  return this.findById(id)
            .populate('lyrics')
            .then(song => song.lyrics)
}


const Song = songSchema.model('song', songSchema)

module.exports = Song
