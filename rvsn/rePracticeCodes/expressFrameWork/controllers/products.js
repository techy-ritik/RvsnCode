const path = require("path");
const rootDir = require("../util/path");

const productModel = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  console.log("in the add product middleware");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  // we can use .get or .post in place of .use as for which method incoming request we are using this middleware and route. (Here .post is used bcz incoming request is post method of the form)
  console.log(req.body); // data sent back by the server which we Post on the server can we recived through req.body
  
  const newProduct = new productModel(req.body.title)  // here title is the name attribute which we set in the form input as we know the input value get stored as the (set name sttribute = the input value).
  newProduct.save();
  res.redirect("/");
};

exports.getProductShop = (req, res, next) => {
  // res.sendFile(path.join(__dirname,'..','views','shop.html'))  //we can use '../' or '..' to go to one level upper folder
  productModel.fetchAll((storedProducts)=>{
    console.log(storedProducts);
    res.sendFile(path.join(rootDir, "views", "shop.html"));
  })
  
};