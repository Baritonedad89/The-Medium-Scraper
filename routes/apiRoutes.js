const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");




module.exports = function (app) {
  // app.get('/', (req, res) => {
  //   res.render('home')
  // })


  // scrape medium site and get push all articles to database
  app.get("/", function (req, res) {
    // empty the collection before scraping for new items so that no duplicates
    db.Article.remove(function (err, p) {
      if (err) {
        throw err;
      } else {
        console.log('No Of Documents deleted:' + JSON.stringify(p));
      }
    });
    // axios call to fetch data from website 
    axios.get("https://medium.com/topic/culture").then(function (response) {

      let $ = cheerio.load(response.data);

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

    }).then(function (scrapes) {
      res.json(scrapes)

    })
    res.render('home')

  });


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