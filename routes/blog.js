const express = require('express');
const db = require('../data/database');
const router = express.Router();
const mongodb = require('mongodb');

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', function(req, res) {
  res.render('posts-list');
});

router.get('/new-post', async function(req, res) {
  let authorsData = await db.getDB().collection('authors').find().toArray(); //the main difference between with or without toArray is that the first one retrieves the result set as an array using the toArray() method, while the second one returns a cursor object that you can use to iterate over the result set and perform operations on it. Which one to use depends on your specific use case and what you want to do with the result set.
  res.render('create-post',{authors:authorsData});
});

router.post('/post', async function(req, res) {
  let postID = req.params.id;
  let postDetails = req.body;

  let authorID = new mongodb.ObjectId(postDetails.author) //convert Author ID that's sent from the form which is STRING to ObjectID to make MongoDB understand  
  let author = await db.getDB().collection('authors').findOne({_id:authorID});
  let newPost = {
    title:postDetails.title,
    summary: postDetails.summary,
    body: postDetails.content,
    date: new Date(),
    author:{
      id: authorID,
      name:author.name
    }
  }
  
  let authorsData = await db.getDB().collection('posts').insertOne(newPost); //the main difference between with or without toArray is that the first one retrieves the result set as an array using the toArray() method, while the second one returns a cursor object that you can use to iterate over the result set and perform operations on it. Which one to use depends on your specific use case and what you want to do with the result set.
  res.redirect('/');
});

module.exports = router;