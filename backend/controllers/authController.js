const User = require('../models/user.js');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//////////////////////////////////////////////
exports.getMe = async (req, res, next) => {
  try {
    if (req.session.userId) {
      const user = await User.fetchById(req.session.userId);

      res.status(200).json(user);
    } else {
      res.status(401).json({
        message: 'User is not authenticated'
      });
    }
  } catch (error) {
    next(error);
  }
};



//////////////////////////////////////////////
exports.postLogin = async (req, res, next) => {
  const {username, password} = req.body;
  console.log('UserName: ', username, 'Password: ', password);
  
  try {
    const userByUsername = await User.fetchByUsername(username);

    if(!userByUsername) {
      return res.status(404).json({
        message: 'Username not found at Login'
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, userByUsername.password);

    if(!isPasswordMatch){
      return res.status(404).json({
        message: 'password mismatched'
      })
    }

    req.session.userId = userByUsername._id.toString();
    res.status(200).json({
      message: 'you logged in successfully',
      user: userByUsername
    })

  } catch (error) {
    next(error);
  }
}

exports.postLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    return res.status(200).json({
      message: "Logged out successfully"
    })

  } catch (error) {
    next(error);
  }
}

exports.postSignup = [
  
  check('name')
    .notEmpty()
    .withMessage("Name is required")
    .trim().isLength({min: 3})
    .withMessage('Name must be atleast two characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters'),

  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  check('username')
    .notEmpty()
    .withMessage("Username is required")
    .trim().isLength({min: 3})
    .withMessage('Username must be atleast three characters long'),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character')
    .trim(),

  check('confirmPassword')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check('genres') // genres is going to be an array of minimum length 3. is the current implementation correct?
    .isArray({min: 3})
    .withMessage('Please select at least 3 genres'),

  check("genres.*")
    .trim().isLength({min: 3})
    .isIn(["Anime & Cosplay","Art","Business & Finance","Collectibles & Other Hobbies","Education & Career","Fashion & Beauty","Food & Drinks","Games","Health","Home & Garden","Humanities & Law","Identity & Relationships","Internet Culture","Movies & TV","Music","Nature & Outdoors","Animals","News & Politics","Places & Travel","Celebrities & Fandoms","Q&As & Stories","Reading & Writing","Sciences","Horror & creepy","Sports","Technology","Vehicles","Wellness","Adult Content","Mature Topics","Memes"])
    .withMessage('Invalid genre(s) type'),

  async (req, res, next) => {
    console.log(req.body);
    const {name, avatar, poster, genres, email, username, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(422).json({
        message: 'validation failed',
        errorMessages: errors.array().map(err => err.msg)
      });
    }
    
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User(name, username, email, hashedPassword, avatar, poster, genres);
      const response = await newUser.save();

      const createdUser = await User.fetchById(response.insertedId.toString())
      
      if(!createdUser) {
        return res.status(404).json({
          message: "Couldn't fetch the user. Try logging into the account.",
        })
      }
      
      req.session.userId = createdUser._id.toString();
      res.status(201).json({
        message: 'Account created successfully',
        user: createdUser,
      });

    } catch (error) {
      next(error);
    }
  }
]