const userModel = require('../models/User');
const rootDir = require('../util/path');
const path = require('path')

exports.getIndex=(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','html','addUser.html'));
}

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
        // res.sendFile(path.join(rootDir,'views','html','addUser.html'));
    })
    .catch((err)=>{
        console.log(err);
    })
}

// exports.postDeleteUser=(req,res,next)=>{   //  as when we recieve data through axios.post in json object then we use this
//     const userId = req.body.userId        
//     console.log("userId", userId);
// }

exports.deleteUser=(req,res,next)=>{     // when we  recieve data by axios.delete request through url dynamic value then we sue this api(middleware)
    const userId = req.params.userId;
    console.log("userId", userId);

    userModel.findByPk(userId)
    .then((FoundUser)=>{
        return FoundUser.destroy();
    })
    .then((result)=>{
        console.log("user deleted !!");
        res.status(200).json({message:"user deleted..."})       // we have to send any response like success status from the last chained then() to frontend which will be recieved as promise response in then() block of axios.delete and after that only the code added in that then() block overthere will get executed else it will remain in pending state
    })
    .catch((err)=>{
        console.log(err);
    })
}