const express=require('express');
const router = express.Router();

const userController = require('../controller/user');

router.post('/',userController.postAddUser);

router.get('/',userController.getUser);


module.exports = router;