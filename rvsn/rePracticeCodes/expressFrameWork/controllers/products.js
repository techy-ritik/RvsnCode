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

  productModel
    .create({      // here we can use .create() builtIn method of sequelize to directly save fetched data from the form input to the model(i.e. database table) and the data is added in the form of object inside create parenthysis where key are the fields of the table and value are those input values which is fethced from the form
      title: req.body.title,
      price: req.body.prc,
    })
    .then(() => {      //  and we also have to handle the response promise with then so that we get assurance of data correctly stored in database
      console.log("product added!!");
      // res.redirect("/");   // here we have to add .redirect() inside the .then(), so that it executes after the .save() method execution got finished and return the promise response
    })
    .catch((err) => {
      console.log(err);
    });

  /** below method(with use of sql queries execution) used before sequelize */

  // const newProduct = new productModel(req.body.title, req.body.prc, null); // here ('title','prc') is the name attribute which we set in the form input as we know the input value get stored as the (set name sttribute = the input value).
  // //                                                                        here we added null because in the constructor there is extra parameter of id is passed for ehich no argumrnt is there in this object creation so it's better to pass null
  // //                                                                         we can store multiple details of the product in the database by getting input through the form and passing it in the constructor while creating new object like this
  // newProduct
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getProductShop = (req, res, next) => {
  // res.sendFile(path.join(__dirname,'..','views','shop.html'))  //we can use '../' or '..' to go to one level upper folder
  productModel
    .findAll()  //  here this findAll() method fetches all the saved product from the table(model) and we can set conditions also like where,like etc. in for of object inside paraenthysis, as we used to execute in sql queries
    .then((storedProducts) => {
      // we can use .then and .catch for handling fetched data from database with promises here as we have exported promise from the database util with the sql database
      // here we are using array destructuring as when output the fetched data in for of result in then block then we have to separately store the array's elements like 'const rows = res[0]; and cosnt fieldData = res[1]; ' but with array destructuring we can directly pullout those data in the passed arguments like 1st arg. get index 0 element stored and so on
      console.log("storedProducts", storedProducts);
      res.sendFile(path.join(rootDir, "views", "shop.html"));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOneProduct = (req, res, next) => {
  const currentProductId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
  console.log("currentProductId", currentProductId);
  productModel
    .findByPk(currentProductId)     // here we use findByPk() inbuilt method of sequelize to fetch single product from database which extract the product matching with the passed id and return the promise response which we get through handling in then() block
    .then((fetchedProductById) => {
      console.log("fetchedProductById", fetchedProductById);
      res.sendFile(path.join(rootDir, "views", "productDetails.html"));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const isEditable = req.query.edit; // req.query works like an object which check for the keys of query parameters available in the url for that we add the same variable after the req.query. which we like to get from the url and then value of that key get stored here in isEditable and if it can't find in the url then here isEditable remain undefined
  if (!isEditable) {
    // in this condition if no query params are found with this key irrespective of true or false then it will redirect it sends error msg file
    return res.sendFile(path.join(rootDir, "views", "404.html"));
  }
  const productId = req.params.productId;
  productModel.findByPk(productId)
  .then((fetchedProductById) => {
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
  })
  .catch((err=>{
    console.log(err);
  }))
};

exports.postEditProduct = (req, res, next) => {

  const productId = req.body.prodctId;

  productModel.findByPk(productId)
  .then((productToEdit)=>{    // here we can now store all the product details in temp. variable created with productToEdit as below becuase like this, we just modify the properties here in js memory and then we can update these details further with database by calling save() method of sequelize
    productToEdit.title = req.body.title;
    productToEdit.price = req.body.prc;

    return productToEdit.save();// here save() method is used to update the details in the fetched product as it works like when the product exist in the database then it update the changes in that product data and if the product doesn't exist then it will craete new product and save it there
                                // and we have to return the save() method so that get promise response of whether it executed successfully or not
    })  // here now we handle the promise response of .save() in another chained then() block
  .then(()=>{
    console.log('product updated !!!')
    res.redirect("/");
  })
  .catch((err)=>{
    console.log(err)
  })
};


exports.postDeleteProduct = (req, res, next) => {
  const productIdToDelete = req.params.productId;
  
  /**  1st approach */
  productModel
    .findByPk(productIdToDelete) //  here at first we fetch the product which we want to delete with the productIdToDelete and then while handling the promise response in then() block we delte the instance of the fetched product by calling the destroy() method
    .then((productToDelete) => {
      return productIdToDelete.destroy(); // and we have to return the destroy() method so that to get promise response of whether it executed successfully or not
    }) // here now we will handle the promise response of .destroy() in another chained then() block
    .then(() => {
      console.log("product deleted!!!");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

  /** alt. approach */

  // productModel
  //   .destroy({ where: { id: productIdToDelete } }) //  here we call .destroy() method for deleting the product and execute it by passing id of the product in where condition as we do with sql queries
  //   .then(() => {
  //     console.log("product deleted !!!");
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

//
//
//
//
//
//
//
//
/** initially worked with fileSystem database and now after adding sql database, fileSystem is removed so I've commented it for the added comment notes*/

// const path = require("path");
// const rootDir = require("../util/path");

// const productModel = require("../models/product");
// const cartModel = require("../models/cart");

// exports.getAddProduct = (req, res, next) => {
//   console.log("in the add product middleware");
//   res.sendFile(path.join(rootDir, "views", "add-product.html"));
// };

// exports.postAddProduct = (req, res, next) => {
//   // we can use .get or .post in place of .use as for which method incoming request we are using this middleware and route. (Here .post is used bcz incoming request is post method of the form)
//   console.log("req.body", req.body); // data sent back by the server which we Post on the server can we recived through req.body

//   const newProduct = new productModel(req.body.title, req.body.prc, null); // here ('title','prc') is the name attribute which we set in the form input as we know the input value get stored as the (set name sttribute = the input value).
//   //                                                                        here we added null because in the constructor there is extra parameter of id is passed for ehich no argumrnt is there in this object creation so it's better to pass null
//   //                                                                         we can store multiple details of the product in the database by getting input through the form and passing it in the constructor while creating new object like this
//   newProduct.save();
//   res.redirect("/");
// };

// exports.getEditProduct = (req, res, next) => {
//   const isEditable = req.query.edit; // req.query works like an object which check for the keys of query parameters available in the url for that we add the same variable after the req.query. which we like to get from the url and then value of that key get stored here in isEditable and if it can't find in the url then here isEditable remain undefined
//   if (!isEditable) {
//     // in this condition if no query params are found with this key irrespective of true or false then it will redirect it sends error msg file
//     return res.sendFile(path.join(rootDir, "views", "404.html"));
//   }
//   const productId = req.params.productId;
//   productModel.fetchOneProduct(productId, (fetchedProductById) => {
//     if (!fetchedProductById) {
//       //  here fetchedProductById will be negative only in case if fetchOneProduct is unable to fetch the product with the requested id and it will not be able to fetch the product only if the product of the requested id will not be there in the product.json file so if it will not be there in the file then it even not show up in admin page, so there is no way to hit edit button and request through admin page on any product for edit request which is not available in the admin page so in this logic this condition is useless but it work when url got manually changed and some invalid id got passed through that which is not in the database file so in that case this condition handles the application from crashing and shows the error whatever we want to show to the user
//       return res.status(404).send("Product not found"); // It's good to send customized error msg to the user by using correct status code so that error can be resolved easily
//     }
//     console.log(`
//       "fetchedProductById.title", ${fetchedProductById.title}  
//       " fetchedProductById.price", ${fetchedProductById.price} 
//       "fetchedProductById.id", ${fetchedProductById.id}
//     `);
//     res.sendFile(path.join(rootDir, "views", "edit-product.html")); // currently not working on frontend part so just sending the static edit-product page with simple blank form without prepopulating the data
//   });
// };

// exports.postEditProduct = (req, res, next) => {
//   const updatedProductObject = new productModel(
//     req.body.title,
//     req.body.prc,
//     req.body.prodctId,
//   ); //  we have to pass all the product details through object and define parameters for them in constructor and those parameters which is not fulfilled by this object will remain undefined
//   updatedProductObject.updateEditedProduct();

//   res.redirect("/");
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const productIdToDelete = req.params.productId;
//   productModel.deleteProductById(productIdToDelete);
//   res.redirect("/");
// };

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.ProductId; // 'productId' will be the same which is input name for the id of the product in recieved form data

  productModel.fetchOneProduct(prodId, (fetchedProdForDelete) => {
    // we have to fetch product of the recived id from the product model so that we can use other details of the product like it's price to pass in the deleteCartProductById so that totaltPrice of the cart got updated
    cartModel.deleteCartProductById(prodId, fetchedProdForDelete.price);
  });
  res.redirect("/cart");
};

// exports.getProductShop = (req, res, next) => {
//   // res.sendFile(path.join(__dirname,'..','views','shop.html'))  //we can use '../' or '..' to go to one level upper folder
//   productModel.fetchAll((storedProducts) => {
//     console.log(storedProducts);
//     res.sendFile(path.join(rootDir, "views", "shop.html"));
//   });
// };

// exports.getOneProduct = (req, res, next) => {
//   const currentProductId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
//   console.log("currentProductId", currentProductId);
//   productModel.fetchOneProduct(currentProductId, (fetchedProductById) => {
//     // here id of the product is sent to fetchOneProduct() by passing currentProductId and product data received through callback function which is defined here and got stored in the fetchedProductById
//     console.log("fetchedProductById", fetchedProductById);
//   });
//   res.sendFile(path.join(rootDir, "views", "productDetails.html"));
// }; // in console we are getting productList output before fetchedproductById because while executing getOneProduct synchronously when readFileData in fetchOneProduct() is executing then there is a callback registered for which js does not wait for it's execution and bcz productList is present in readFileData before calling cb so it will get logged before cb execution

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
