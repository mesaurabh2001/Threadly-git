// Local Module
const {getDB} = require('../utils/database.js');

// External Module
const {ObjectId}  = require('mongodb');

module.exports = class User {
  
  constructor (name, username, email, avatar, poster, genres, _id) {
    this.name = name;
    this.username = username;
    this.email = email;

    this.avatar = avatar;
    this.poster = poster;

    this.genres = genres || [];

  
    this.posts = [];
    this.followedPosts = [];
    this.savedPosts = [];
    this.upvotedPosts = [];
    this.downvotedPosts = [];
    this.hiddenPosts = [];
    this.commentedPosts = [];
    this.joinedCommunities = [];
    
    if (_id) {
      this._id = _id;
    }
  }

  save () {
    const db = getDB();

    if (this._id){ // Update Case
      const updatedUser = {
        name: this.name,
        username: this.username,
        email: this.email,
        
        avatar: this.avatar,
        poster: this.poster,

        genres: this.genres,
        
        posts: this.posts,
        followedPosts: this.followedPosts,
        savedPosts: this.savedPosts,
        upvotedPosts: this.upvotedPosts,
        downvotedPosts: this.downvotedPosts,
        joinedCommunities: this.joinedCommunities,
      }

      return db.collection('users').updateOne(
        {_id: new ObjectId(this._id)},
        {$set: updatedUser}
      )

    } else { // Insert Case
      return db.collection('users').insertOne({
        ...this,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
  }

  static fetchAll () {
    const db = getDB();
    return db.collection('users').find().toArray();
  }

  static fetchById (id) {
    const db = getDB();
    return db.collection('users').find({_id: new ObjectId(id)}).next();
  }

  static deleteById (id) {
    const db = getDB();
    return db.collection('users').deleteOne({_id: new ObjectId(id)});
  }
}