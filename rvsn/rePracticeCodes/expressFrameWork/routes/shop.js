const express = require("express");
// const path = require('path');

// const rootDir = require('../util/path')  // ass middleware moved to controllers so all the functionalities are defined in their taht's why path package and util/path import is of no use here

const router = express.Router();

const productController = require("../controllers/products");

router.get(["/",'/shop'], productController.getProductShop);


module.exports = router;