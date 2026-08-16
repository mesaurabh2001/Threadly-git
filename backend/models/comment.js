// Local Module
const {getDB} = require('../utils/database.js');

// External Module
const {ObjectId} = require('mongodb');

module.exports = class Comment {
  
  constructor (postId, userId, content, parentCommentId) {
    this.postId = new ObjectId(postId);
    this.userId = new ObjectId(userId);
    this.content = content;
    this.parentCommentId = parentCommentId ? new ObjectId(parentCommentId) : null;
    
    this.upvotes = [];
    this.downvotes = [];
  }

  save () {
    const db = getDB();
    return db.collection('comments').insertOne({
      ...this,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  
  static fetchAll () {
    const db = getDB();
    return db.collection('comments').find().toArray();
  }
  
  static fetchById (id) {
    const db = getDB();
    return db.collection('comments').find({_id: new ObjectId(id)}).next();
  }
  
  static fetchByPostId (postId) {
    const db = getDB();
    // return db.collection('comments').find({postId: new ObjectId(postId)}).toArray();
    return db.collection('comments').aggregate([
      {
        $match: {
          postId: new ObjectId(postId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          postId: 1,
          userId: 1,
          content: 1,
          parentCommentId: 1,
          upvotes: 1,
          downvotes: 1,
          createdAt: 1,
          updatedAt: 1,
          "user._id": 1,
          "user.name": 1,
          "user.username": 1,
          "user.avatar": 1
        }
      }
    ]).toArray();
  }
  
  static deleteById (id) {
    const db = getDB();
    return db.collection('comments').deleteOne({_id: new ObjectId(id)});
  }
}