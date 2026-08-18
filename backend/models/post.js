// Local Modules
const {getDB} = require('../utils/database.js');
const dummyPosts = require('../utils/dummyPosts.js');

// External Module
const {ObjectId} = require('mongodb');


class Post {

  constructor (communityId, userId, title, description, genre, tags, images, _id) {

    this.communityId = communityId;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.genre = genre;
    this.tags = tags;
    this.images = images;

    this.followedBy = [];
    this.upvotes = [];
    this.downvotes = [];
    this.comments = [];
    if (_id) {
      this._id = _id;
    }
  }

  save () {
    const db = getDB();
    if (this._id) {
      const updatedPost = {
        communityId : this.communityId,
        userId : this.userId,
        title : this.title,
        description : this.description,
        images : this.images,
        genre: this.genre,

        createdAt : this.createdAt,
        updatedAt : new Date(),
        followedBy : this.followedBy,
        upvotes : this.upvotes,
        downvotes : this.downvotes,
        comments : this.comments,
      }
      return db.collection('posts').updateOne(
        {_id : new ObjectId(this._id)}, 
        {$set: updatedPost}
      );
      
    } else {
      return db.collection('posts').insertOne({
        ...this,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
  }

  static fetchAll () {
    const db = getDB()
    return db.collection('posts').find().toArray();
  }

  static fetchById (id) {
    const db = getDB();
    return db.collection('posts').find({_id : new ObjectId(id)}).next();
  }

  static deleteById (id) {
    const db = getDB();
    return db.collection('posts').deleteOne({_id: new ObjectId(id)});
  }
}

// setTimeout( async () => {
//   try {
//     for(const post of dummyPosts) {
//       const newPost = new Post(
//         post.communityId,
//         post.userId,
//         post.title,
//         post.description,
//         post.images
//       );

//       await newPost.save();
//     }

//     console.log('Posts Added Successfully');

//   } catch (error) {
//     console.log(error);
//   }
// }, 3000)

module.exports = Post;
