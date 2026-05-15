const express=require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/',userController.getIndex);

router.post('/addUser',userController.postAddUser);

router.get('/user',userController.getUser);

// router.post('/deleteUser',userController.postDeleteUser)   // here when we use post request for handling deleteUser then user id is sent from frontend as json object then we have to use this route for recieving data, so here we have to extract id by req.body from recieved json object
router.delete('/deleteUser/:userId',userController.deleteUser) // here when we use delete request for handling deleteUser then user id is sent from frontend as part of url in form of dynamic value then we have to use this route for receiving data , so here we have to extract id by req.params from recieved url dynamic value

module.exports = router;