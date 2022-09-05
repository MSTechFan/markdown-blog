const mongoose = require('mongoose')
const slugify  = require('slugify')
const {Schema} = mongoose
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const marked = require('marked')

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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizeHtml: {
        type: String, 
        required: true
    }
})

articleSchema.pre('validate', function (next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if(this.markdown) {
        this.sanitizeHtml = dompurify.sanitize(marked.parse(this.markdown))
    }

    next()
})

module.exports = mongoose.model('Article', articleSchema)