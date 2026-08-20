// External Modules
const express = require('express');
const cors = require('cors');

// Local Modules
const {mongodbConnect} = require('./utils/database.js');
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const postRouter = require('./routes/postRouter.js');
const commentRouter = require('./routes/commentRouter.js');
const communityRouter = require('./routes/communityRouter.js');

const rootDir = require('./utils/pathUtil.js');

// Core Modules
const path = require('path');

const app = express(); // returns an app object

// Utility Routes - 
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Main Routes - 
app.use((req, res, next) => {
  console.log("Cookie check middleware: ", req.get('cookie'));
  next();
})
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(communityRouter);

// 404
app.use((req, res, next) => {
  res.status(404).json({
    message: 'page not found',
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  
  res.status(500).json({
    message: 'Something went wrong on the server',
  })
})

const PORT = 3000;
const SERVER_URL = 'http://localhost:3000'
mongodbConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server started at ${SERVER_URL}`);
  });
})
