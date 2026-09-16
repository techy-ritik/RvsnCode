const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.userAuthentication = (req, res, next) => {
  const token = req.header("Authorization"); // here we extract authorization token from header like this

  console.log("token", token);
  if(!token){
    console.log("token required")
    return res.status(401).json({message:"please login again..!"})
  }

  const currentUser = jwt.verify(
    token,
    "dee29e102252e45bb511d3244effba3d2158ac9289c6879f84a46d7d589a93cd33d0048870be26c1e62efbd0d292e030a68698c49530b6c94be8839dd375d281",
  );
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
