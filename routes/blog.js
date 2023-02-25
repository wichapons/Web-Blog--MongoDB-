const express = require('express');
const db = require('../data/database');
const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', function(req, res) {
  res.render('posts-list');
});

router.get('/new-post', async function(req, res) {
  let authorsData = await db.getDB().collection('authors').find().toArray(); //the main difference between with or without toArray is that the first one retrieves the result set as an array using the toArray() method, while the second one returns a cursor object that you can use to iterate over the result set and perform operations on it. Which one to use depends on your specific use case and what you want to do with the result set.
  res.render('create-post');
});

module.exports = router;