const userModel = require('../models/User');
const rootDir = require('../util/path');
const path = require('path')

exports.getIndex=(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','html','addUser.html'));
}

exports.postAddUser=(req,res,next)=>{
    console.log("inside postAddUser");
    const userObj ={
        userName : req.body.username,
        email : req.body.email,
        phoneNo : req.body.phone,
    }

    console.log('userName : '+ userObj.userName + '\n','email : '+ userObj.email + '\n','phone no. : '+ userObj.phoneNo)
    userModel.create(userObj)
    .then(()=>{
    res.redirect('/user');
    })
    .catch((err)=>{
        console.log(err);
    })

};

exports.getUser=(req,res,next)=>{
    console.log('inside getUser')

    userModel.findAll()
    .then((userList)=>{
        // console.log("userList", userList);
        res.json(userList);
    })
    .catch((err)=>{
        console.log(err);
    })
}


exports.deleteUser=(req,res,next)=>{  
    const userId = req.params.userId;
    console.log("userId", userId);

    userModel.findByPk(userId)
    .then((FoundUser)=>{
        return FoundUser.destroy();
    })
    .then((result)=>{
        console.log("user deleted !!");
        res.status(200).json({message:"user deleted..."})       
    })
    .catch((err)=>{
        console.log(err);
    })
}