const express=require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/',userController.getIndex);

router.post('/addUser',userController.postAddUser);

router.get('/user',userController.getUser);

router.delete('/deleteUser/:userId',userController.deleteUser) 

module.exports = router;