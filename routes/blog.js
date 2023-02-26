const express = require('express');
const db = require('../data/database');
const router = express.Router();
const mongodb = require('mongodb');

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
  const postDetails = await db.getDB().collection('posts').find({},{title:1,summary:1,'author.name':1}).toArray();
  res.render('posts-list',{posts:postDetails});
});

router.get('/view/:id', async function(req, res) {
  let postID = req.params.id;
  console.log(postID);
  //let authorID = new mongodb.ObjectId('postID')
  let postDetails = await db.getDB().collection('posts').find({},{_id:postID}).toArray();
  console.log(postDetails);
  //const postDetails = await db.getDB().collection('posts').find({},{title:1,summary:1,'author.name':1}).toArray();
  res.render('post-detail',{posts:postDetails});
});

router.get('/new-post', async function(req, res) {
  let authorsData = await db.getDB().collection('authors').find().toArray(); //the main difference between with or without toArray is that the first one retrieves the result set as an array using the toArray() method, while the second one returns a cursor object that you can use to iterate over the result set and perform operations on it. Which one to use depends on your specific use case and what you want to do with the result set.
  res.render('create-post',{authors:authorsData});
});

router.post('/post', async function(req, res) {
  
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
  await db.getDB().collection('posts').insertOne(newPost); //the main difference between with or without toArray is that the first one retrieves the result set as an array using the toArray() method, while the second one returns a cursor object that you can use to iterate over the result set and perform operations on it. Which one to use depends on your specific use case and what you want to do with the result set.
  res.redirect('/');
});




module.exports = router;