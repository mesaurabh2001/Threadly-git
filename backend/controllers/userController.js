const User = require('../models/user.js');

////////////////////////////////////////////////////
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.fetchAll();
    res.json(users);
    
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////
exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.fetchById(userId);
    if(!user) {
      return res.status(404).json({
        message: 'user not found',
      })
    }
    res.json(user);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////
exports.addUser = async (req, res, next) => {
  try {
    const {name, username, email, avatar, poster, genres} = req.body;
    const user = new User(name, username, email, avatar, poster, genres);

    const response = await user.save();
    user._id = response.insertedId;
    res.status(201).json(user);
    
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.fetchById(userId);
    if(!user) {
      return res.status(404).json({
        message: 'user not found',
      })
    }

    const {name, username, email, avatar, poster, genres} = req.body;
    user.name = name;
    user.username = username;
    user.email = email;
    user.avatar = avatar;
    user.poster = poster;
    user.genres = genres;

    await user.save();
    res.json(user);

  } catch (error) {
    
  }
}

////////////////////////////////////////////////////
exports.deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const response = await User.deleteById(userId);
    
    if(response.deletedCount === 0) {
      return res.status(404).json({
        messaage: 'user not found',
      })
    }
    res.status(204).send();
    
  } catch (error) {
    next(error);
  }
}