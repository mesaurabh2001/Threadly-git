const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController.js');

authRouter.get('/me', authController.getMe);
authRouter.post('/login', authController.postLogin);
authRouter.post('/logout', authController.postLogout);
authRouter.post('/signup', authController.postSignup)

module.exports = authRouter;