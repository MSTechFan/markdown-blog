const express = require('express')
const mongoose = require('mongoose')
const {urlencoded} = express
const app = express()
const articleRouter = require('./routes/articles')

mongoose.connect("mongodb+srv://MSTechFan:CityBarranquilla2022@cluster0.obgityr.mongodb.net/appdbs?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(urlencoded({extended: false}))

app.get('/', (req, res) => {
    const articles = [
    {
        title: 'Test Article',
        date: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        date: new Date(),
        description: 'Test description 2'
    }
    ]
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)

