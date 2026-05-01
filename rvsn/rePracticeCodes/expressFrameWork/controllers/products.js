const path = require("path");
const rootDir = require("../util/path");

const productModel = require("../models/product");
const cartModel = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  console.log("in the add product middleware");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  // we can use .get or .post in place of .use as for which method incoming request we are using this middleware and route. (Here .post is used bcz incoming request is post method of the form)
  console.log("req.body", req.body); // data sent back by the server which we Post on the server can we recived through req.body

  const newProduct = new productModel(req.body.title, req.body.prc, null); // here ('title','prc') is the name attribute which we set in the form input as we know the input value get stored as the (set name sttribute = the input value).
  //                                                                        here we added null because in the constructor there is extra parameter of id is passed for ehich no argumrnt is there in this object creation so it's better to pass null
  //                                                                         we can store multiple details of the product in the database by getting input through the form and passing it in the constructor while creating new object like this
  newProduct.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const isEditable = req.query.edit; // req.query works like an object which check for the keys of query parameters available in the url for that we add the same variable after the req.query. which we like to get from the url and then value of that key get stored here in isEditable and if it can't find in the url then here isEditable remain undefined
  if (!isEditable) {
    // in this condition if no query params are found with this key irrespective of true or false then it will redirect it sends error msg file
    return res.sendFile(path.join(rootDir, "views", "404.html"));
  }
  const productId = req.params.productId;
  productModel.fetchOneProduct(productId, (fetchedProductById) => {
    if (!fetchedProductById) {
      //  here fetchedProductById will be negative only in case if fetchOneProduct is unable to fetch the product with the requested id and it will not be able to fetch the product only if the product of the requested id will not be there in the product.json file so if it will not be there in the file then it even not show up in admin page, so there is no way to hit edit button and request through admin page on any product for edit request which is not available in the admin page so in this logic this condition is useless but it work when url got manually changed and some invalid id got passed through that which is not in the database file so in that case this condition handles the application from crashing and shows the error whatever we want to show to the user
      return res.status(404).send("Product not found"); // It's good to send customized error msg to the user by using correct status code so that error can be resolved easily
    }
    console.log(`
      "fetchedProductById.title", ${fetchedProductById.title}  
      " fetchedProductById.price", ${fetchedProductById.price} 
      "fetchedProductById.id", ${fetchedProductById.id}
    `);
    res.sendFile(path.join(rootDir, "views", "edit-product.html")); // currently not working on frontend part so just sending the static edit-product page with simple blank form without prepopulating the data
  });
};

exports.postEditProduct = (req, res, next) => {
  const updatedProductObject = new productModel(
    req.body.title,
    req.body.prc,
    req.body.prodctId,
  );    //  we have to pass all the product details through object and define parameters for them in constructor and those parameters which is not fulfilled by this object will remain undefined 
  updatedProductObject.updateEditedProduct();

  res.redirect('/')
};

exports.postDeleteProduct=(req,res,next)=>{
  const productIdToDelete = req.params.productId;
  productModel.deleteProductById(productIdToDelete);
  res.redirect('/');
}

exports.postDeleteCartProduct=(req,res,next)=>{
  const prodId = req.body.ProductId;   // 'productId' will be the same which is input name for the id of the product in recieved form data

  productModel.fetchOneProduct(prodId,(fetchedProdForDelete)=>{   // we have to fetch product of the recived id from the product model so that we can use other details of the product like it's price to pass in the deleteCartProductById so that totaltPrice of the cart got updated 
    cartModel.deleteCartProductById(prodId, fetchedProdForDelete.price);
  })
  res.redirect('/cart');
}

exports.getProductShop = (req, res, next) => {
  // res.sendFile(path.join(__dirname,'..','views','shop.html'))  //we can use '../' or '..' to go to one level upper folder
  productModel.fetchAll((storedProducts) => {
    console.log(storedProducts);
    res.sendFile(path.join(rootDir, "views", "shop.html"));
  });
};

exports.getOneProduct = (req, res, next) => {
  const currentProductId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
  console.log("currentProductId", currentProductId);
  productModel.fetchOneProduct(currentProductId, (fetchedProductById) => {
    // here id of the product is sent to fetchOneProduct() by passing currentProductId and product data received through callback function which is defined here and got stored in the fetchedProductById
    console.log("fetchedProductById", fetchedProductById);
  });
  res.sendFile(path.join(rootDir, "views", "productDetails.html"));
}; // in console we are getting productList output before fetchedproductById because while executing getOneProduct synchronously when readFileData in fetchOneProduct() is executing then there is a callback registered for which js does not wait for it's execution and bcz productList is present in readFileData before calling cb so it will get logged before cb execution

exports.postCart = (req, res, next) => {
  const currentProdId = req.body.productId; // here as the user is hitting add to cart through form for any particular product so the req.body contain input data of that form of single product only and productId is the name of the input value for id of that item which can be extracted and used here
  console.log(currentProdId);

  productModel.fetchOneProduct(currentProdId, (fetchedProduct) => {
    // here we are calling getOneProduct() for passing product's price in the cart modelto store it in the cart database file
    cartModel.addProductToCart(currentProdId, fetchedProduct.price);
  });

  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "cart.html"));
};
