const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product       /// in url there is /admin because it's already pre-added '/admin' is in app.use in app.js file
router.get('/edit-product/:productId',adminController.getEditProduct);   // we need to add dynamic routes of the productId so that edit page for the product will open which we want to edit

router.post('/edit-product',adminController.postEditProduct);

module.exports = router;
