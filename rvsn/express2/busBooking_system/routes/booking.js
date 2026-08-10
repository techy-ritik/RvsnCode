const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

router.post('/add',bookingController.addEntries);

router.put('/update/:id',bookingController.updateEntry)

router.delete('/delete/:id',bookingController.deleteEntry)

module.exports = router;