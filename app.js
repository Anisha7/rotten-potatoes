const express = require('express')
const app = express()

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
  title: String
});

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" },
//   { title: "Previous Review" }
// ]

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

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
