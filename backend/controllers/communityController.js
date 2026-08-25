// Local Module
const Community = require('../models/community.js');
const Post = require('../models/post.js');

////////////////////////////////////////////
exports.getCommunities = async (req, res, next) => {
  try {
    const communities = await Community.fetchAll();
    res.json(communities);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////
exports.getCommunitiesSummaries = async (req, res, next) => {
  try {
    const communities = await Community.fetchSummaries();
    res.json(communities);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////
exports.getCommunityById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const community = await Community.fetchById(id);

    if(!community) {
      return res.status(404).json({
        message: 'community not found'
      })
    }
    res.json(community);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////
exports.getCommunityPosts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const posts = await Post.fetchByCommunityId(id);
    res.json(posts);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////
exports.addCommunity = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      message: 'You must be logged in to create a community'
    })
  }

  try {
    const {name, title, avatar, poster, description, tags, genre, rules} = req.body;
    const admin = req.session.userId;
    const community = new Community(name, title, avatar, poster, admin, description, tags, genre, rules);

    const response = await community.save();
    community._id = response.insertedId;
    res.status(201).json(community);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////
exports.deleteCommunityById = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    const response = await Community.deleteById(id);
    
    if (response.deleteCount === 0) {
      return res.status(404).json ({
        message: 'post not found',
      })
    }

    res.status(204).json(id);

  } catch (error) {
    next(error);
  }
}