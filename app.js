
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const express = require('express')
const methodOverride = require('method-override')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

// initializing handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initialized

// initializing mongoose and connecting to data base
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// add a model to review
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieRating: String,
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


// INDEX
// The find() method returns a Promise. A Promise is an object that represents a value that will be provided in the future.
// Call .then() and provide a function for the Promise to call when it resolves
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW review
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE a new review
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message);
  })
})

// SHOW (url/request parameter)
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
