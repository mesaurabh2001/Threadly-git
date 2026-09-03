// Local Module
const {getDB} = require('../utils/database.js');

// External Module
const {ObjectId}  = require('mongodb');

module.exports = class User {
  
  constructor (name, username, email, password, avatar, poster, genres, _id) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;

    this.avatar = avatar;
    this.poster = poster;

    this.genres = genres;

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
      // const updatedUser = {
      //   name: this.name,
      //   username: this.username,
      //   email: this.email,
      //   password: this.password,
        
      //   avatar: this.avatar,
      //   poster: this.poster,

      //   genres: this.genres,
        
      //   followedPosts: this.followedPosts,
      //   savedPosts: this.savedPosts,
      //   upvotedPosts: this.upvotedPosts,
      //   downvotedPosts: this.downvotedPosts,
      //   joinedCommunities: this.joinedCommunities,
      // }

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
    return db.collection('users').aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          avatar: 1,
          poster: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray();
  }

  static fetchById (id) {
    const db = getDB();
    return db.collection('users').aggregate([
      {
        $match: {
          _id: new ObjectId(id)
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          avatar: 1,
          poster: 1,
          genres: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).next();
  }
  
  static fetchByUsername (username) {
    const db = getDB();
    return db.collection('users').aggregate([
      {
        $match: {
          username: username
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          password: 1,
          avatar: 1,
          poster: 1,
          genres: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).next();
  }

  static deleteById (id) {
    const db = getDB();
    return db.collection('users').deleteOne({_id: new ObjectId(id)});
  }
}