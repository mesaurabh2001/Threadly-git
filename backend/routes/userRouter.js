const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController.js');

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:userId', userController.getUserById);

userRouter.post('/users', userController.addUser);

userRouter.delete('/users/:userId', userController.deleteUserById)

module.exports = userRouter;