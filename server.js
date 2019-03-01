// require all my dependencies
const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars');
// const db = require('../models');
const moment = require('moment');


const app = express();

// PORT
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
app.engine(
    'handlebars',
    exphbs({
      defaultLayout: 'main'
    })
  );

app.set('view engine', 'handlebars');

  // Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// If deployed, use the deployed database. Otherwiese use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mediumScraper'



// make connection to mongoose
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});








 // Start the server
app.listen(PORT, function() {
    console.log(`App running on http://localhost:${PORT} !`);
  });

  module.exports = app;