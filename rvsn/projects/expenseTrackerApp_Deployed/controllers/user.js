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

  const {email,password} = req.body;
  console.log(email,password);

  userModel.findAll({where:{email:email}})
  .then((user)=>{
    console.log("user",user)
    user=user[0];
    if(!user){
      res.status(404).json({ message: "user not found" });
      return;
    }
    if(user.password!==password){
      res.status(401).json({ message: "User not authorized: incorrect password" });
      return;
    }
    res.status(200).json({user:user,message:'user login successfull'});

  })
  .catch((err)=>{
    console.log(err);
  })
}