const express = require('express');
const commentRouter = express.Router();

const commentController = require('../controllers/commentController.js');

commentRouter.get('/posts/:postId/comments', commentController.getComments);
commentRouter.get('/comments/:commentId', commentController.getCommentById)

commentRouter.post('/posts/:postId/comments', commentController.addComment);

commentRouter.delete('/comments/:commentId', commentController.deleteCommentById);

module.exports = commentRouter;