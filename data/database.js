const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const client = await MongoClient.connect('mongodb://localhost:27017');