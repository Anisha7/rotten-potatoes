//reviews.js

const Review = require('../models/reviews')
const Comment = require('../models/comment')
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('28721379fb90bd78a4d224a9cb6ddbcc')

module.exports = function (app) {

  app.get('/movies/:movieId/reviews/new', (req, res) => {
    console.log(req.body)
    res.render('reviews-new', { movieId: req.params.movieId });
  })

  // CREATE a new review
  app.post('/movies/:movieId/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
      // find review
      Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
          // respond with the template with both values
          res.render('reviews-show', { review: review, comments: comments, movies: req.params.movieId })
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    });

  // EDIT
  app.get(`/movies/:movieId/reviews/:id/edit`, function (req, res) {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review, movies: req.params.movieId });
    })
  })

  // UPDATE
  app.put('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // DELETE REVIEWS
  app.delete('/movies/:movieId/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect(`/movies/${req.params.movieId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // DELETE COMMENT
    app.delete('/movies/:movieId/reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })

}
