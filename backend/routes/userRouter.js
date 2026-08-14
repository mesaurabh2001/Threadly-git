const express = require('express');
const userRouter = express.Router();


userRouter.get('/', (req, res, next) => {
  console.log('UserRouter - /');
  console.log(req.url, req.method);
});

userRouter.use('/user', (req, res, next) => {
  console.log('UserRouter - /user');
  console.log(req.url, req.method);
});

module.exports = userRouter;