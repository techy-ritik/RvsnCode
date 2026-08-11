const express = require('express');
const router = express.Router();

const busController = require('../controllers/bus');

router.post('/buses',busController.addBus);

router.get('/buses/available/:seats',busController.fetchBuses);

module.exports = router;