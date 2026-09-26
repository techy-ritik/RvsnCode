const path = require("path");
const rootDir = require("../util/path");
const dotenv = require("dotenv");
dotenv.config();

const Sib = require("sib-api-v3-sdk");
const uuid = require("uuid");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userModel = require("../models/user");
const forgotPassowrdRequestModel = require("../models/forgotPasswordRequestes");

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
      return userModel.create({
        name,
        email,
        password: hash,
        userType: "non-premium",
        totalExpense: 0,
      });
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
            res.status(200).json({
              user: user,
              message: "user login successfull",
              token: generateTokens(user.id),
            });
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

exports.forgotPassword = async (req, res) => {
  try {
    console.log("email", req.body);
    const { resetEmail } = req.body;

    const generatedUuidId = uuid.v4();

    const client = Sib.ApiClient.instance; // extracting api client out of Sib

    const apiKey = client.authentications["api-key"]; // extracting apiKey object out of client
    apiKey.apiKey = process.env.BREVO_API_KEY; // apiKey object is set

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
      email: "ritikeshjee@gmail.com",
    };

    const recievers = [
      {
        email: resetEmail,
      },
    ];

    const user = await userModel.findOne({ where: { email: resetEmail } });

    if (!user) {
      throw new Error("user not found");
    }
    const resetPasswordRequest = await forgotPassowrdRequestModel.create({
      id: generatedUuidId,
      isActive: true,
      UserId: user.id,
    });

    const resetUrl = `http://localhost:5000/password/resetPassword/${resetPasswordRequest.id}`;

     await tranEmailApi.sendTransacEmail({
      sender,
      to: recievers,
      subject: "wrong password",
      textContent: `your password is incorrect, if u want to reset the password got to the link below : \n${resetUrl}`,
    });

    console.log(sender);
    // console.log("emailToSend",emailToSend)

    res.status(200).json({ message: "password reset link sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { requestId } = req.params;

    const AvailablePasswordRequest =
      await forgotPassowrdRequestModel.findByPk(requestId);

    if(!AvailablePasswordRequest){
      throw new Error("request not available")
    }

    if (AvailablePasswordRequest.isActive == false) {
      return res.json({ message: "link expired" });
    }

    await AvailablePasswordRequest.update(
      { isActive: false },
      {
        where: {
          id: requestId,
        },
      },
    );

    res
      .status(200)
      .sendFile(path.join(rootDir, "views/resetPassowrdForm.html"));
  } catch (err) {
    console.log(err);
    res.status(500).json({message:err.message})
  }
};

exports.updateNewPassword = async (req, res) => {
  try {
    const { updatedPassword, requestId } = req.body;

    const AvailablePasswordRequest =
      await forgotPassowrdRequestModel.findByPk(requestId);

    if(!AvailablePasswordRequest){
      throw new Error("request not available");
    }

    const saltrounds = 10;
    const encryptedPassword = await bcrypt.hash(updatedPassword, saltrounds);

    await userModel.update(
      { password: encryptedPassword },
      { where: { id: AvailablePasswordRequest.UserId } },
    );

    res.status(200).json({ message: "password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:err.message});
  }
};
