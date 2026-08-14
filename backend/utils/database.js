const mongodb = require('mongodb');
const dns = require('dns');
const externalUrl = require('../../../ThreadlyDatabaseUrl');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const MongoClient = mongodb.MongoClient;

const URL = externalUrl;

let _db;
const mongodbConnect = (callback) => {
  MongoClient.connect(URL)
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db('threadly');
      callback();
    })
    .catch((err) => {
      console.log("MongoDB connection failed:", err);
    })
};

const getDB = () => {
  if(!_db) {
    throw new Error('MongoDB not connected');
  }
  return _db;
}

module.exports.getDB = getDB;
module.exports.mongodbConnect = mongodbConnect;