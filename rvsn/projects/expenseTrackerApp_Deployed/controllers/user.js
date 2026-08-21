const path = require("path");
const rootDir = require("../util/path");

const userModel = require("../models/user");

exports.getSignUpPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/signUp.html"));
};

exports.addUser = (req, res, next) => {
  const userObj = ({ name, email, password } = req.body);

  userModel
    .findAll({ where: { email: email } })
    .then((existingUser) => {
      if (existingUser[0]) {
        res.status(403).json({message:"user already exist"});
        return;
      }
      return userModel.create(userObj);
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginUser=(req,res,next)=>{
  console.log("login user")
}