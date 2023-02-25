const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connect(){
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('blog');
}

function getDB(){
    if (!database){
        throw{message: 'Database is not established yet'}   //if no try or catch,  terminate the program.
    }
    return database
}