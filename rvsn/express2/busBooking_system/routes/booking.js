const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

router.post('/bookings',bookingController.addBooking);

router.get("/users/:id/bookings",bookingController.fetchBookingForUser);

router.get("/buses/:id/bookings",bookingController.fetchBookingForBus);

module.exports = router;