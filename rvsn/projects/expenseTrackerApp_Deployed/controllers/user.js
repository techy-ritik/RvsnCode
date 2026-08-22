const path = require("path");
const rootDir = require("../util/path");

const bcrypt = require("bcrypt");
const userModel = require("../models/user");

exports.getSignUpPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/signUp.html"));
};

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
      return bcrypt.hash(password, saltrounds);  // method for hashing the password by using bcrypt method
    })
    .then((hash) => {
      return userModel.create({ name, email, password: hash });
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
            res
              .status(200)
              .json({ user: user, message: "user login successfull" });
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
