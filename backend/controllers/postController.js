// Local Module
const Post = require('../models/post.js');

/////////////////////////////////////////////////
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.fetchAll();
    res.json(posts);

  } catch (error) {
    next(error);
  }
}

///////////////////////////////////////////////////
exports.getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.fetchById(id);

    if(!post){
      return res.status(404).json({
        message: 'page not found'
      })
    }

    res.json(post);

  } catch (error) {
    next(error);
  }
  
}

/////////////////////////////////////////////////
exports.addPost = async (req, res, next) => {
  try {
    const {communityId, userId, title, description, genre, tags, images} = req.body;
    const post = new Post(communityId, userId, title, description, genre, tags, images);
    
    const response = await post.save();
    post._id = response.insertedId;
    res.status(201).json(post);

  } catch (error) {
    next(error);
  }
}

/////////////////////////////////////////////////
exports.deletePostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await Post.deleteById(id);

    if(response.deletedCount === 0) {
      return res.status(404).json({
        message: 'post not found',
      })
    }

    res.status(204).json(id);

  } catch (error) {
    next(error);
  }
}
