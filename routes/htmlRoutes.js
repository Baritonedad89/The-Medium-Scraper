var db = require("../models");

module.exports = function (app) {

// display all articles where isSaved == false 
  app.get("/", function (req, res) {
    db.Article.find({
      isSaved: false
    }, (error, dbArticle) => {
      if (error) {
        console.log(error);
      }

      console.log(dbArticle)
      // res.send(dbArticle)
      res.render("articles", { articles: dbArticle });
    })

  });

  



  app.get('/saved', function (req, res) {
    db.Article.find({
      isSaved: true
    }, (err, savedArticles) => {
      if (err) {
        console.log(err);
      }
      console.log(savedArticles)
      res.render("saved", { savedArticles: savedArticles });
    });
    // probably won't work 
    app.get('/populated', function (req,res){
      db.Article.find({}
        .populate('comments')
        .then(function(dbArticles) {
          console.log(dbArticles)
          res.render('save', {comment_articles: dbArticles})
        })
        )
    })
  })




};
