const productServices = require("../services/productServices");

exports.getAllProducts = (req, res) => {
  res.send(productServices.fetchProducts());
};

exports.addProduct = (req, res) => {
  res.send(productServices.addProducts());
};

exports.getProductById = (req, res) => {
  res.send(productServices.fetchProductById(req));
};
