const express = require('express')
const app = express()

// initializing handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initialized


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// extending route to render home.handlebars
app.get('/', (req, res) => {
  res.render('home', { msg: 'Hello World!' });
})


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
