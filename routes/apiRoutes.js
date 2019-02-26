const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");




module.exports = function (app) {
  
  // scrape medium site and get push all articles to database
  app.get("/api/headlines", function (req, res) {

    
    // axios call to fetch data from website 
    axios.get("https://medium.com/topic/culture").then(function (response) {

      let $ = cheerio.load(response.data);

// empty the collection before scraping for new items so that no duplicates
    db.Article.deleteMany(function (err, p) {
      if (err) {
        throw err;
      } else {
        console.log('No Of Documents deleted:' + JSON.stringify(p));
      }
    });

      $('div.dp').each(function (i, element) {
        let headline = $(element).find('h3.ai').find('a').text();
        let summary = $(element).find('div.dv').find('a').text();
        let url = $(element).find('h3.ai').find('a').attr('href')

        // create article document 
        db.Article.create({
          headline: headline,
          summary: summary,
          url: url
        })
      })
      return []
    }).then(function (scrapes) {
      res.json(scrapes);
      

    })
    .catch(function(err) {
      // If an error occurred, log it
      console.log(err);
    });
    // res.redirect("/articles")
      // res.render('home')

  });




app.put('/api/headlines/saved/:id', function (req, res) {
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

app.put('/api/headlines/saved/delete-saved/:id', function (req, res) {
    const id = req.params.id;
    console.log(id)
    db.Article.update(
      {
        "_id": id
      },
      {
        $set: {
          "isSaved": false
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






//   // db.[COLLECTION_NAME].drop()
app.delete('/api/headlines/clear-all', function(req, res) {
  db.Article.deleteMany(function (err, p) {
    if (err) {
      throw err;
    } else {
      console.log('No Of Documents deleted:' + JSON.stringify(p));
      res.render("articles", { articles: p });

    }
  });


})

}






  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });


// app.get("/scrape", function (req, res) {
//   db.scrapedData.remove();
//   axios.get("https://www.nytimes.com").then(function (res) {
//     let $ = cheerio.load(res.data);
//     let results = [];
//     $("article").each(function (i, element) {
//       let title = $(element).find("h2").text();
//       let link = "www.nytimes.com";
//       link += $(element).find("a").attr("href");

//       db.scrapedData.insert({
//         title: title,
//         link: link
//       });
//     });
//   }).then(function(){
//     res.send("hey");
//   });
// });