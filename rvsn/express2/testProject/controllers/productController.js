const productServices = require("../services/productServices");
const path = require('path')
const db = require("../util/database");


exports.getAllProducts = (req, res) => {
  console.log("Fetching All Products");

  res.sendFile(path.join(__dirname, "..", "views", "products.html"));
};

exports.addProduct = (req, res) => {
  console.log(req.body.productName);
};

exports.getProductById = (req, res) => {
  res.send(productServices.fetchProductById(req));
};
