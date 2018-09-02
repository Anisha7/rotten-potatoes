const express = require('express')
const app = express()

// initializing handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initialized

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review" },
  { title: "Next Review" },
  { title: "Previous Review" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
