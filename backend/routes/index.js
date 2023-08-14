var express = require('express'); // require express library
var router = express.Router(); // is used to create routes

const fetch = require('node-fetch'); // is used to fetch data

const NEWS_API_KEY = process.env.NEWS_API_KEY; // GET my secret token to use news API

/**
 * Description :
 * GET all articles from API (newsapi)
 * Send all articles in json format
 * 
 * @param {any} req is not used because we have no data to require
 * @param {any} res is the route response in json format
 */
router.get('/articles', (req, res) => {
  fetch(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${NEWS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

module.exports = router;
