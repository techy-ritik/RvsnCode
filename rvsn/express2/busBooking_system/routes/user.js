const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/users',userController.fetchEntries);

router.post('/users',userController.addEntries);

router.put('/update/:id',userController.updateEntry)

router.delete('/delete/:id',userController.deleteEntry)

module.exports = router;