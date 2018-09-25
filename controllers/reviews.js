//reviews.js

const Review = require('../models/reviews')
const Comment = require('../models/comment')
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('28721379fb90bd78a4d224a9cb6ddbcc')

module.exports = function (app) {
  // app.get('/', (req, res) => {
  //   Review.find()
  //     .then(reviews => {
  //       res.render('reviews-index', {reviews: reviews});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // })

  // NEW review
  // app.get('/reviews/new', (req, res) => {
  //   res.render('reviews-new', {});
  // })

  app.get('/movies/:movieId/reviews/new', (req, res) => {
    console.log(req.body)
    res.render('reviews-new', { movieId: req.params.movieId });
  })

  // CREATE a new review
  app.post('/movies/:movieId//reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // SHOW
    app.get('/movies/:movieId//reviews/:id', (req, res) => {
      // find review
      Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
          // respond with the template with both values
          res.render('reviews-show', { review: review, comments: comments })
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    });

  // EDIT
  app.get('/movies/:movieId//reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review});
    })
  })

  // UPDATE
  app.put('/movies/:movieId//reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // DELETE
  app.delete('/movies/:movieId//reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // DELETE
    app.delete('/movies/:movieId//reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })

}
