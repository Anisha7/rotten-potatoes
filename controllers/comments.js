// comments.js

module.exports = function (app) {

  // NEW Comment
  app.post('/reviews/comments', (req, res) => {
    res.send('reviews comment')
  })

  // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/'${comment.reviewId}`)
      }).catch((err) => {
        console.log(err.message)
      })
    })

}
