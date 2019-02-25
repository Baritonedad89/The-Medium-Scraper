var db = require("../models");

module.exports = function (app) {


  app.get("/articles", function (req, res) {
    db.Article.find({}, (error, dbArticle) => {
      if (error) {
        console.log(error);
      }

      console.log(dbArticle)
      // res.send(dbArticle)
      res.render("articles", { articles: dbArticle });
    })

  });

  // db.places.update({"country": "Morocco"}, {$set: {"continent": "Antarctica"}})
  app.put('/saved/:id', function (req, res) {
    const id = req.params.id;
    console.log(id)
    db.Article.update(
      {
        "_id": id
      },
      {
        $set: {
          "isSaved": true
        }
      },
      function (err, savedArticle) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        else {
          console.log(savedArticle);
        }
      }
    );

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
    }
    )
  })




};
