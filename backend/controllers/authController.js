

//////////////////////////////////////////////
exports.getLogin = async (req, res, next) => {
  
  try {
    

  } catch (error) {
    next(error);
  }
}

//////////////////////////////////////////////
exports.postLogin = async (req, res, next) => {
  const {username, password} = req.body;
  const userId = "6a83707b3cb931beabad0418"
  try {
    console.log('UserName: ', username);
    console.log('Password: ', password);

    res
    .cookie("isLoggedIn", true)
    .cookie("userId", userId)
    .status(200)
    .json({
      message: 'you logged in successfully',
      userId: userId
    })

  } catch (error) {
    next(error);
  }
}