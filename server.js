const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');


const app = express();

const dbURI = 'mongodb://localhost:27017/blogs';

mongoose.connect(dbURI, 
    {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use(function(req,res,next){console.log(req.method,req.url); next();});
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', {articles : articles});
})

app.use(function(req,res,next){console.log(req.method,req.url); next();});
app.use('/articles', articleRouter);


app.listen(5000, () => {
    console.log("Listening on port 5000.....");
});