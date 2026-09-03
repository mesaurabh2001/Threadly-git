const express = require('express');
const postRouter = express.Router();
const upload = require('../middleware/multer.js');

// Local Modules
const postController = require('../controllers/postController.js');

postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:id', postController.getPostById);

postRouter.post(
  '/posts',
  upload.fields([
    {name: 'images' },
    {name: 'video' }
  ]),
  postController.addPost
);

postRouter.delete('/posts/:id', postController.deletePostById);

module.exports = postRouter;