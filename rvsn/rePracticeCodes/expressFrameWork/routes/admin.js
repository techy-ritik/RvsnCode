const express = require('express');
// const path = require('path');

// const rootDir = require('../util/path')  // ass middleware moved to controllers so all the functionalities are defined in their taht's why path package and util/path import is of no use here

const router = express.Router();

const productController = require('../controllers/products')
const contactController = require('../controllers/contact')

router.get("/add-product", productController.getAddProduct);

router.post("/add-product", productController.postAddProduct);

router.get("/edit-product/:productId",productController.getEditProduct);   // we create dynamic raoute for the edit product because we have to edit details of different single product every time and we distinguish it with the help of productId

router.post('/edit-product',productController.postEditProduct);

router.post('/delete-product/:productId',productController.postDeleteProduct);  // same as edit product get route
                                                                                //  we should always use post request for delete route as deletion of only those products are possible which is in the databse and that only can be displayed to the user on the webPage so the delete button can be hit for those products only and it's universal rule is that for changing data in the database, we should always use post request
                                                                                // we can also send productId with the form input's hidden value which is also correct as it is used in trainer's downloaded project
router.get('/contactus',contactController.getContact);

router.post('/contactus',contactController.postContact);

router.post("/success" ,contactController.postSuccess);

//here we using same route name in both of the above middleware but the method is different so it's executing separately at different method call

module.exports = router;