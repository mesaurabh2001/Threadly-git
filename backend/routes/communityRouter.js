const express = require('express');
const communityRouter = express.Router();

const communityController = require('../controllers/communityController.js');

communityRouter.get('/communities', communityController.getCommunities);
communityRouter.get('./communities/:id', communityController.getCommunityById);

communityRouter.post('./communities', communityController.getCommunityById);


module.exports = communityRouter;