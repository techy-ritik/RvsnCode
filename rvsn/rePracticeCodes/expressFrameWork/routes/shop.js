const express = require("express");
// const path = require('path');

// const rootDir = require('../util/path')  // ass middleware moved to controllers so all the functionalities are defined in their taht's why path package and util/path import is of no use here

const router = express.Router();

const productController = require("../controllers/products");

router.get(["/", "/shop"], productController.getProductShop);

router.get('/product/:productId',productController.getOneProduct);    // //here when we use ":"(colon) then it works as accepting dynamic value i.e. it does not pass any fixed value all the time, instead it will pass different id of the products for every different product and it does not look for any url in which '/:productId' itself is mentioned in it instead it looks for it's value
                                                                // the variable name productId which is used for handling dynamic value in the url is to be kept same as we set in the controller while extarcting the dynamic value at req.params line

router.post('/cart',productController.postCart);    // when user will hit add to cart for any product then form having post method with this '/cart' url will get submitted so then this route will execute

router.get('/cart',productController.getCart);

router.post('/delete-cartItem',productController.postDeleteCartProduct);      //  input data for the id will be fetched with the submitted form from the cart views

module.exports = router;