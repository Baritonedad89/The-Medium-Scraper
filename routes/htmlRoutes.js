// dependencies
const db = require('../models');
const moment = require('moment')


module.exports = function (app) {

  // display all articles where isSaved == false 
  app.get('/', function (req, res) {
    db.Article.find({
      isSaved: false
    }, (error, dbArticle) => {
      if (error) {
        console.log(error);
      }

      console.log(dbArticle)
      // res.send(dbArticle)
      res.render('articles', { articles: dbArticle });
    })

  });


  // find all articles where isSaved property is true and display
  app.get('/saved', function (req, res) {
    db.Article.find({
      isSaved: true
    }).populate('comments')
      .then((savedArticles) => {
        console.log(savedArticles)
        res.render('saved', { savedArticles: savedArticles });
      }).catch(err => {
        console.log(err);
      })
  })

};
