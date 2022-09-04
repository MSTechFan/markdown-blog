const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const {urlencoded} = express
const app = express()
const articleRouter = require('./routes/articles')

mongoose.connect("mongodb+srv://MSTechFan:CityBarranquilla2022@cluster0.obgityr.mongodb.net/appdbs?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({date: "desc"})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)

