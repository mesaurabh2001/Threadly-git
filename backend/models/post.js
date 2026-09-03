// Local Modules
const {getDB} = require('../utils/database.js');

// External Module
const {ObjectId} = require('mongodb');


class Post {

  constructor (communityId, userId, title, description, genre, tags, mediaDimension, images, video, _id) {

    this.communityId = new ObjectId(communityId);
    this.userId = new ObjectId(userId);
    this.title = title;
    this.description = description;
    this.genre = genre;
    this.tags = tags;
    this.mediaDimension = mediaDimension;
    this.images = images;
    this.video = video;

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
    // if (this._id) {
    //   const updatedPost = {
    //     communityId : this.communityId,
    //     userId : this.userId,
    //     title : this.title,
    //     description : this.description,
    //     images : this.images,
    //     genre: this.genre,

    //     createdAt : this.createdAt,
    //     updatedAt : new Date(),
    //     followedBy : this.followedBy,
    //     upvotes : this.upvotes,
    //     downvotes : this.downvotes,
    //     comments : this.comments,
    //   }

    //   return db.collection('posts').updateOne(
    //     {_id : new ObjectId(this._id)}, 
    //     {$set: updatedPost}
    //   );
    // }
    
    return db.collection('posts').insertOne({
      ...this,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
  }

  static fetchAll () {
    const db = getDB()
    return db.collection('posts').aggregate([
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
        $lookup: {
          from : 'communities',
          localField: 'communityId',
          foreignField: '_id',
          as : 'community'
        }
      },
      {
        $unwind: '$community'
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          mediaDimension: 1,
          images: 1,
          video: 1,
          upvotedCount: {
            $size: '$upvotes',
          },
          downvotedCount: {
            $size: '$downvotes'
          },
          createdAt: 1,
          updatedAt: 1,

          "user._id": 1,
          "user.username": 1,
          "user.avatar": 1,
          
          'community._id': 1,
          'community.name': 1,
          'community.avatar': 1
        }
      }
    ]).toArray();
  }

  static fetchById(id) {
    const db = getDB();

    return db.collection('posts').aggregate([
      {
        $match: {
          _id: new ObjectId(id)
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
        $lookup: {
          from: 'communities',
          localField: 'communityId',
          foreignField: '_id',
          as: 'community'
        }
      },
      {
        $unwind: '$community'
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          genre: 1,
          tags: 1,
          mediaDimension: 1,
          images: 1,
          video: 1,
          createdAt: 1,
          updatedAt: 1,

          // User fields
          'user._id': 1,
          'user.username': 1,
          "user.avatar": 1,

          // Community fields
          'community._id': 1,
          'community.name': 1,
          'community.avatar': 1
        }
      }
    ]).next();
  }

  static fetchByCommunityId (communityId) {
    const db = getDB();
    return db.collection('posts').aggregate([
      {
        $match: {
          communityId: new ObjectId(communityId)
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
        $lookup: {
          from: 'communities',
          localField: 'communityId',
          foreignField: '_id',
          as: 'community'
        }
      },
      {
        $unwind: '$community'
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          mediaDimension: 1,
          images: 1,
          video: 1,
          createdAt: 1,
          updatedAt: 1,

          "user._id": 1,
          "user.username": 1,
          "user.avatar": 1,
          
          'community._id': 1,
          'community.name': 1,
          'community.avatar': 1
        }
      }
    ]).toArray();
  }

  static deleteById (id) {
    const db = getDB();
    return db.collection('posts').deleteOne({_id: new ObjectId(id)});
  }
}

module.exports = Post;
