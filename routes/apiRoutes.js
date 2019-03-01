// dependencies
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');




module.exports = function (app) {

  // scrape medium site 
  app.get('/api/headlines', function (req, res) {
    axios.get('https://medium.com/topic/culture').then(function (response) {

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
        let headline = $(element).find('a').text();
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
      .catch(function (err) {
        console.log(err);
      });
  });


  // change the clicked article's isSaved property to true 
  app.put('/api/headlines/saved/:id', function (req, res) {
    const id = req.params.id;
    console.log(id)
    db.Article.update(
      {
        '_id': id
      },
      {
        $set: {
          'isSaved': true
        }
      },
      function (err, savedArticle) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        else {
          res.render('articles', { articles: savedArticle });

          console.log(savedArticle);
        }
      }
    );

  });

  // change the clicked article's isSaved property to false 
  app.put('/api/headlines/saved/delete-saved/:id', function (req, res) {
    const id = req.params.id;
    console.log(id)
    db.Article.update(
      {
        '_id': id
      },
      {
        $set: {
          'isSaved': false
        }
      },
      function (err, savedArticle) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        else {

          console.log(savedArticle);
          res.render('saved', { savedArticles: savedArticle })
        }
      }
    );

  });





// clear articles and comments from database on clear all button onclick
  app.delete('/api/headlines/clear-all', function (req, res) {
    // clear all articles in database
    db.Article.deleteMany(function (err, p) {
      if (err) {
        throw err;
      } else {
        console.log('No Of Documents deleted:' + JSON.stringify(p));
        res.render('articles', { articles: p });
      }
    });
    // clear all comments in database 
    db.Comment.remove({}, function(err, d) {
      if(err){
        throw err;
      }
      else {
        return
      }
    })
  });

// delete each individual comment 
  app.delete('/api/comment/delete/:id', function (req,res) {
    const id = req.params.id;

    db.Comment.remove({_id: id}, function(err, p){
      if(err){
        throw err;
      } else {
        res.render('saved',{articles: p})
      }
    })
  });

  // post comments 
  app.post('/api/comment/post/:id', function (req, res) {
    const id = req.params.id;
    const name = req.query.name;
    const comment = req.query.comment;
    db.Comment.create({
      name: name,
      comment: comment,
      dateCreated: Date.now()
    })
      .then(function (dbComment) {

        return db.Article.findOneAndUpdate({ _id: id }, { $push: { comments: dbComment } });
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      })
  });


}





