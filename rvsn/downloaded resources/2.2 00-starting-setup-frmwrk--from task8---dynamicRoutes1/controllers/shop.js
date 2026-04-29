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
  Cart.getCart(cart=>{
    Product.fetchAll(adminProducts=>{     // we have to call product model also to display some more details of the product in the cart which is not available in the cart database
      const cartProducts =[]
      for(let product of adminProducts){

        const cartProductData = cart.products.find(prod=>prod.id===product.id)  // here it will check through all the product of the adminProduct and try to match that product in the cart, and if it finds that product in the cart then return it and will get stored in cartProductData at each loop iteration
        if(cartProductData){
          //  and now if condition will be validated as true if the product found and if it is not found and nothing returned then if condition will be false
          cartProducts.push({ productData: product, qty: cartProductData.qty }); //   here now cartProducts will store all those product of the adminProduct database file which is available in cart also but as the qty data is only available in cart databse so we have to pass qty separately through cartProductData as this is the product we are extracting with find method at each loop iteration
        }   
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    })
  })
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
