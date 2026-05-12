const userModel = require('../models/User');
const rootDir = require('../util/path');
const path = require('path')

exports.postAddUser=(req,res,next)=>{
    console.log("inside postAddUser");
    const userName = req.body.username;
    const email = req.body.email;
    const phoneNo = req.body.phone;
    console.log('userName : '+ userName + '\n','email : '+ email + '\n','phone no. : '+ phoneNo)
    userModel.create({
        userName : userName,
        email : email,
        phoneNo : phoneNo
    })
    .then(()=>{
    res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    })

};

exports.getUser=(req,res,next)=>{
    console.log('inside getUser')

    userModel.findAll()
    .then((userList)=>{
        console.log("userList", userList);
    })
    .catch((err)=>{
        console.log(err);
    })

    res.sendFile(path.join(rootDir,'views','html','addUser.html'));
}