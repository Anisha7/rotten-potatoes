
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

//ßconst express = require('express')
import express from 'express'
const methodOverride = require('method-override')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));


const reviews = require('./controllers/reviews.js');

// initializing handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initialized
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
reviews(app)
//const Review = require('./models/reviews')


module.exports = app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
