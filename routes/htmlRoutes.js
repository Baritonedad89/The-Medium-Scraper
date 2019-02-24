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

  app.get('/saved/:id', function (req, res) {
    const id = req.params.id;
    console.log(id)
    db.Article.findOne(
      {
        _id: id
      },
      function (err, savedArticle) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        else {
          console.log(savedArticle);
          res.render("saved", {saved: savedArticle})
        }
      }
    );
});





  // // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
