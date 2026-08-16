const Comment = require('../models/comment.js');

//////////////////////////////////////////////
exports.getComments = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.fetchByPostId(postId);
    res.json(comments);

  } catch (error) {
    next(error);
  }
}

///////////////////////////////////////////////////
exports.getCommentById = async (req, res, next) => {
  const id = req.params.commentId;
  try {
    const comment = await Comment.fetchById(id)
    
    if(!comment) {
      return res.status(404).json({
        message: 'comment not found',
      })
    }
    res.json(comment);

  } catch (error) {
    next(error);
  }
}

exports.addComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const {userId, content, parentCommentId } = req.body;
    
    const comment = new Comment(postId, userId, content, parentCommentId);
    const response = await comment.save();
    comment._id = response.insertedId;
    res.status(201).json(comment);

  } catch (error) {
    next(error);
  }
}

exports.deleteCommentById = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const response = await Comment.deleteById(commentId);
    if (response.deletedCount === 0){
      return res.status(404).json({
        message: 'comment not found',
      })
    }
    res.status(204).send();

  } catch (error) {
    next(error);
  }
}