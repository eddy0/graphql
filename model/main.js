const mongoose = require('mongoose')
const {url} = require('./config')

mongoose.Promise = global.Promise
mongoose.connect(url)

class Model extends mongoose.Model {
    static async all() {
        return super.find()
    }

    static async get(id) {
        return super.findById(id)
    }

    static async findBy(key, value) {
        const query = {
            [key]: value
        }

        return super.findOne(query).exec()
    }

    static async findAll(key, value) {
        const query = {
            [key]: value
        }

        return super.find(query).exec()
    }

    static async remove(id) {
        const query = {
            _id: id
        }

        return super.deleteOne(query)
    }
}

module.exports = {
    mongoose: mongoose,
    Model: Model
}
