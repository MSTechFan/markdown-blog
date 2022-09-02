const mongoose = require('mongoose')
const {Schema} = mongoose

const articleSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: String,
    markdown: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)