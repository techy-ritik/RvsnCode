const express = require('express');
const router = express.Router();

const userController  = require('../controllers/user');

router.get('/',userController.getSignUpPage);

// router.get('/login-page',userController.getLoginPage)

router.post("/register",userController.addUser);

router.post('/login',userController.loginUser);

router.post("/password/forgotpassword",userController.forgotPassword);

module.exports = router;