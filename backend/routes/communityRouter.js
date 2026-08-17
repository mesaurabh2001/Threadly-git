const express = require('express');
const communityRouter = express.Router();

const communityController = require('../controllers/communityController.js');

communityRouter.get('/communities', communityController.getCommunities);
communityRouter.get('/communities/summaries', communityController.getCommunitiesSummaries);
communityRouter.get('/communities/:id', communityController.getCommunityById);

communityRouter.post('/communities', communityController.addCommunity);

communityRouter.post('/communities/:id', communityController.deleteCommunityById)


module.exports = communityRouter;