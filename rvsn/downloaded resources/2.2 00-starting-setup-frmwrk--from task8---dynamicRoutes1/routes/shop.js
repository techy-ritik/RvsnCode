const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct)  //here when we use ":"(colon) then it works as dynamic value pass i.e. it does not pass any fixed value instead it will pass different id of the products each different product
                                                                // here the variable name productId which is used for handling dynamic value in the url is to set same as we set in the controller while extarcting the dynamic value at req.params line 
router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
