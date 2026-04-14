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
  productModel.fetchAll((storedProducts) => {
    console.log(storedProducts);
    res.sendFile(path.join(rootDir, "views", "shop.html"));
  });
};

exports.getOneProduct = (req,res,next)=>{
  const currentProductId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
  console.log("currentProductId", currentProductId);
  productModel.fetchOneProduct(currentProductId,(fetchedProductById)=>{
    // here id of the product is sent to fetchOneProduct() by passing currentProductId and product data received through callback function which is defined here and got stored in the fetchedProductById
    console.log("fetchedProductById", fetchedProductById);
  })
  res.sendFile(path.join(rootDir, "views", "productDetails.html"));
}  // in console we are getting productList output before fetchedproductById because while executing getOneProduct synchronously when readFileData in fetchOneProduct() is executing then there is a callback registered for which js doesnot wait for it's execution and finishes the execution of getOneProduct in which productList get logged due to  res.redirect('/') 


exports.postCart=(req,res,next)=>{
  const currentProdId = req.body.productId; // here as the user is hitting add to cart through form for any particular product so the req.body contain input data of that form of single product only and productId is the name of the input value for id of that item which can be extracted and used here
  console.log(currentProdId);
  res.redirect("/cart");
}

exports.getCart=(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','cart.html'));
}