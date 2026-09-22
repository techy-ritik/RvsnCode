const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.userAuthentication = (req, res, next) => {
  const token = req.header("Authorization"); // here we extract authorization token from header like this

  console.log("token", token);
  if(!token){
    console.log("token required")
    return res.status(401).json({message:"please login again..!"})
  }

  const currentUser = jwt.verify(token, process.env.SECRET_ENCRYPTION_KEY);
  const userId = currentUser.userId;
  console.log("authorized userId",userId)

  userModel
    .findByPk(userId)
    .then((user) => {
      req.user = user; // we have added current loggedIn user fetched object in the current route request so we can access it in any function which is to be attached with this function's route
      // console.log("req.user", req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
