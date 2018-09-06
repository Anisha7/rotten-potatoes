
const port = process.env.PORT || 5000;
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const express = require('express')
//import express from 'express'
const methodOverride = require('method-override')

// for comment model
const Review = require('./models/reviews')
const Comment = require('./models/comment')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const comments = require('./controllers/comments.js');
const reviews = require('./controllers/reviews.js');

// initializing handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initialized
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
comments(app)
reviews(app)
//const Review = require('./models/reviews')


module.exports = app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
