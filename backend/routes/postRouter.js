const express = require('express');
const postRouter = express.Router();

// Local Modules
const postController = require('../controllers/postController.js');

postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:id', postController.getPostById);

postRouter.post('/posts', postController.addPost);

postRouter.delete('/posts/:id', postController.deletePostById);

module.exports = postRouter;