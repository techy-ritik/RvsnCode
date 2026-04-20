const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
  console.log("prodId", prodId);
  Product.findById(prodId, (foundProduct) => {
    // here id is sent back to findById by passing prodId and product data received through callback function which is defined here and got stored in the foundProduct
    console.log("foundProduct", foundProduct);
    res.render("shop/product-detail", {
      // as res.render specially desgined for ejs files so when we call it we don't need to enter full path, as it always look into views folder so we just need to enter folder and file name inside of views
      product: foundProduct, // here product is the key which is set so that it can be accessed in the view
      pageTitle: foundProduct.title,
      path: "/products", // sending path variable like this for active navigation links works only with ejs.
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // here as the user is hitting add to cart through form for any particular product so the req.body contain input data of that form of single product only and productId is the name of the input value for id of that item which can be extracted and used here
  console.log(prodId);

  Product.findById(prodId, (foundProduct) => {    //  as we are storing product id and product price in the cart model(database) so we have to extract price by fetching the single product of that particular id
    Cart.addProduct(prodId, foundProduct.price);
    res.redirect("/cart");
  }); // here for passing product price we have to fetch single product from the id for that we have to call findById and then we can pass id and price in the addProduct method of cart model
};


exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
