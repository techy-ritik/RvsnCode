const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment')

const authMiddleware = require('../middlewares/auth');

router.get('/',paymentController.getPaymentPage);

router.post('/pay',authMiddleware.userAuthentication,paymentController.processPayment);

router.get('/payment-status/:orderId',paymentController.getPaymentStatus);

module.exports = router;