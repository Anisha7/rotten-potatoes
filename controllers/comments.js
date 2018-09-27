// comments.js
const Comment = require('../models/comment')

module.exports = function (app) {

    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
        console.log(req.body)
      Comment.create(req.body).then(comment => {
        res.status(200).send({ comment: comment });
      }).catch((err) => {
          console.log("error with posting comment")
        res.status(400).send({ err: err })
      })
    })

    app.delete('/reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then(comment => {
        res.status(200).send(comment);
      }).catch((err) => {
        console.log(err.message);
        res.status(400).send(err)
      })
    })

}
