const path = require("path");
const rootDir = require("../util/path");
const dotenv = require('dotenv');
dotenv.config();

const Sib = require('sib-api-v3-sdk')

const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken')
const userModel = require("../models/user");

exports.getSignUpPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/signUp.html"));
};

// exports.getLoginPage = (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views/login.html"));
// };

exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;

  userModel
    .findAll({ where: { email: email } })
    .then((existingUser) => {
      if (existingUser[0]) {
        res.status(403).json({ message: "user already exist" });
        return;
      }

      const saltrounds = 10;
      return bcrypt.hash(password, saltrounds); // method for hashing the password by using bcrypt method
    })
    .then((hash) => {
      return userModel.create({ name, email, password: hash, userType: "non-premium", totalExpense:0 }); 
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  userModel
    .findAll({ where: { email: email } })
    .then((user) => {
      console.log("user", user);
      user = user[0];
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      bcrypt
        .compare(password, user.password) // method used for comparing bcrypted saved hashed password with the user input password
        .then((result) => {
          // here result store boolean value in form of true or false based on comparison of the password
          if (result == true) {
            // console.log("userId",user.id)
            res
              .status(200)
              .json({ user: user, message: "user login successfull", token: generateTokens(user.id)});
          } else {
            res
              .status(401)
              .json({ message: "User not authorized: incorrect password" });
          }
        });
    })

    .catch((err) => {
      console.log(err);
    });
};

function generateTokens(userId) {
  return jwt.sign({ userId: userId }, process.env.SECRET_ENCRYPTION_KEY);
}

exports.forgotPassword = async(req,res) =>{
  try {
    console.log("email", req.body);
    const {resetFormEmail} = req.body

    const client = Sib.ApiClient.instance; // extracting api client out of Sib

    const apiKey = client.authentications["api-key"]; // extracting apiKey object out of client
    apiKey.apiKey = process.env.BREVO_API_KEY;      // apiKey object is set 

    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
      email: 'ritikeshjee@gmail.com'
    }

    const recievers = [
      {
        email:resetFormEmail
      },
    ]

    const emailToSend = await tranEmailApi.sendTransacEmail({
      sender,
      to:recievers,
      subject:"forgot password",
      textContent:'your password is incorrect, u can reset the password'
    })

    console.log(sender)
    console.log("emailToSend",emailToSend)


  } catch (err) {
    console.log(err);
  }
}