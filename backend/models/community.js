// Local Module
const {getDB} = require('../utils/database.js');

// External Module
const {ObjectId} = require('mongodb');

module.exports = class Community {
  
  constructor (name, avatar, poster, admin, genre, _id) {
    this.name = name;
    this.avatar = avatar;
    this.poster = poster;
    this.admin = admin;
    this.genre = genre;

    this.members = [];
    this.posts = [];
    this.reportedPosts = [];
    this.markedDeletePosts = [];

    if (_id) {
      this._id = _id;
    }
  }

  save () {
    const db = getDB();
    
    if(this._id) { // Update Case
      const updatedCommunity = {
        name: this.name,
        avatar: this.avatar,
        poster: this.poster,
        genre: this.genre,
        
        admin: this.admin,
        updatedAt: new Date(),

        members: this.members,
        posts: this.posts,
        reportedPosts: this.reportedPosts,
        markedDeletePosts: this.markedDeletePosts,
      };
      
      return db.collection('communities').updateOne(
        {_id : new ObjectId(this._id)},
        {$set: updatedCommunity}
      );

    } else { // Insert Case
      return db.collection('communities').insertOne({
        ...this,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  static fetchAll () {
    const db = getDB();
    return db.collection('communities').find().toArray();
  }

  static fetchById (id) {
    const db = getDB();
    return db.collection('communities').find({_id : new ObjectId(id)}).next();
  }

  static deleteById (id) {
    const db = getDB();
    return db.collection('communities').deleteOne({_id : new ObjectId(id)});
  }
}