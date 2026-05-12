const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add&Edit-product", {
    //  as the form which is used for add product will be same as what we use while editing the product so a single view for bith created as add&Edit-product
    pageTitle: "Add Product",
    path: "/admin/add-product", // here path will remain named '/add-product', as it directs from the url to router and then from router to controller's middleware where it's defined that what functionality we have to impliment on that url so here now it will render 'add&Edit-product' which has nothing to do with path
    editing: false, // as we are setting condition in 'add&Edit-product.ejs' views file using editing variable so we have to make that variable available in addProduct also , for only that purpose we are having this key here, and it's value should be flase always to display 'Add Button', which is in else block for which false condition is fulfilling
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    // here we can use .create() builtIn method of sequelize to directly save fetched data from the form input to the model(i.e. database table) and the data is added in the form of object inside create parenthysis where key are the fields of the table and value are those input value which is fethced from the form
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      //  and we also have to handle the response promise with then so that we get assurance of data correctly stored in database
      console.log("product added");
      res.redirect("/admin/products");     // here we have to add .redirect() inside the .then(), so that it executes after the .save() method execution got finished and return the promise response
    })
    .catch((err) => {
      console.log(err);
    });

  /** below method(with use of sql queries execution) used before sequelize */

  // const product = new Product(null, title, imageUrl, description, price); // here we added null because in the constructor there is extra parameter of id is passed for ehich no argumrnt is there in this object creation so it's better to pass null
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/"); // here we have to add .redirect() inside the .then(), so that it executes after the .save() method execution got finished and return the promise response
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      //  so here products will carry the actual products data which is saved in the table
      console.log("products", products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /** below method(with use of sql queries execution) used before sequelize */

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     // here we are using array destructuring as when output the fetched data in for of result in then block then we have to separately store the array's elements like 'const rows = res[0]; and cosnt fieldData = res[1]; ' but with array destructuring we can directly pullout those data in the passed arguments like 1st arg. get index 0 element stored and so on
  //     //  so here rows will carry the actual products data which is saved in the table and fieldData will carry the metaData(cahracterisctic of each column about conditions that is set for the columns)
  //     console.log("rows", rows);
  //     console.log("fieldData", fieldData);
  //     res.render("admin/products", {
  //       prods: rows,
  //       pageTitle: "Admin Products",
  //       path: "/admin/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // req.query works like an object which check for the keys of query parameters available in the url for that we add the same variable after the req.query. which we like to get from the url and then value of that key get stored here in editMode and if it can't find in the url then here editMode remain undefined
  if (!editMode) {
    // in this condition if no query params are found with this key irrespective of true or false then it will redirect it to home page
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((foundProduct) => {
      console.log('foundProduct',foundProduct)
      if (!foundProduct) {
        //  here foundProduct will be negative only in case if findByPk is unable to fetch the product with the requested id and it will not be able to fetch the product only if it will not be there in the product.json file so if it will not be there in the file then it even not show up in admin page, so there is no way to hit edit button and request through admin page on any product for edit request which is not available in the admin page so in this logic this condn. is useless but it work when urll got manually changed and some invalid id got passed through that whihc is not in the database file so in that case this condition handles the application from crashing and shows the eroor we want to show the user
        return res.redirect("/");
      }
      res.render("admin/add&Edit-product", {
        //  as the form which is used for edit product will be same as what we use while adding the product so a single view for both are created as add&Edit-product
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        //                                here path will be named as '/edit-product' so that it directs to this middleware and then we can use this middleware to add functionality for editing of the product on the form that will open on this route
        editing: editMode, // for getting value of editing dynamically as received by the server we keep it's value as editMode and editMode will get it's value whether it will be true or false from the url
        productToEdit: foundProduct,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const UpdatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findByPk(prodId)
    .then((foundProduct) => {    // here we can now store all the product details in temp. variable created with foundProduct as below becuase like this we just modify the properties here in js memory and then we can update these details further with database by calling save() sequelize method
      foundProduct.title = updatedTitle;
      foundProduct.price= updatedPrice;
      foundProduct.description=updatedDescription;
      foundProduct.imageUrl=UpdatedImageUrl 
      return foundProduct.save();    // here save() method is used to update the details in the fetched product as it works like when the product exist in the database then it update the changes in that product data and if the product doesn't exist then it will craete new product and save it there
                                // and we have to return the save() method so that get promise response of whether it executed successfully or not
    })  // and then handle the promise response of .save() in another chained then() block
    .then(()=>{
      console.log('product updated!!!');
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  /** 1st approach */ 
  // Product.destroy({where:{id : prodId}}) //  here we call .destroy() method for deleting the product and wxecute it by passing id of the product in where condition as we do with sql queries
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  /** alt. approach */
  Product.findByPk(prodId) //  here at first we fetch the product which we want to delete with the prodId and then while handling the promise response in then() block we delte the instance of the fetched product by calling the destroy() method
    .then((product) => {
      return product.destroy();   // and we have to return the destroy() method so that to get promise response of whether it executed successfully or not
    })  // here now we will handle the promise response of .destroy() in another chained then() block 
    .then(() => {
      console.log("product deleted!!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};












/** initially worked with fileSystem database and now after adding sql database fileSystem is removed so I've commented it for the added comment notes*/

// const Product = require('../models/product');

// exports.getAddProduct = (req, res, next) => {
//   res.render("admin/add&Edit-product", {
//     //  as the form which is used for add product will be same as what we use while editing the product so a single view for bith created as add&Edit-product
//     pageTitle: "Add Product",
//     path: "/admin/add-product", // here path will remain named '/add-product', as it directs from the url to router and then from router to controller's middleware where it's defined that what functionality we have to impliment on that url so here now it will render 'add&Edit-product' which has nothing to do with path
//     editing: false, // as we are setting condition in 'add&Edit-product.ejs' views file using editing variable so we have to make that variable available in addProduct also , for only that purpose we are having this key here, and it's value should be flase always to display 'Add Button', which is in else block for which false condition is fulfilling
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product(null,title, imageUrl, description, price);   // here we added null because in the constructor there is extra parameter of id is passed for ehich no argumrnt is there in this object creation so it's better to pass null
//   product.save();
//   res.redirect('/');
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit; // req.query works like an object which check for the keys of query parameters available in the url for that we add the same variable after the req.query. which we like to get from the url and then value of that key get stored here in editMode and if it can't find in the url then here editMode remain undefined
//   if (!editMode) {
//     // in this condition if no query params are found with this key irrespective of true or false then it will redirect it to home page
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, (foundProduct) => {
//     if (!foundProduct) {
//       //  here foundProduct will be negative only in case if findById is unable to fetch the product with the requested id and it will not be able to fetch the product only if it will not be there in the product.json file so if it will not be there in the file then it even not show up in admin page, so there is no way to hit edit button and request through admin page on any product for edit request which is not available in the admin page so in this logic this condn. is useless but it work when urll got manually changed and some invalid id got passed through that whihc is not in the database file so in that case this condition handles the application from crashing and shows the eroor we want to show the user
//       return res.redirect("/");
//     }
//     res.render("admin/add&Edit-product", {
//       //  as the form which is used for edit product will be same as what we use while adding the product so a single view for both are created as add&Edit-product
//       pageTitle: "Edit Product",
//       path: "/admin/edit-product",
//       //                                here path will be named as '/edit-product' so that it directs to this middleware and then we can use this middleware to add functionality for editing of the product on the form that will open on this route
//       editing: editMode, // for getting value of editing dynamically as received by the server we keep it's value as editMode and editMode will get it's value whether it will be true or false from the url
//       productToEdit: foundProduct,
//     });
//   });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const UpdatedImageUrl = req.body.imageUrl;
//   const updatedDescription = req.body.description;

//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     UpdatedImageUrl,
//     updatedDescription,
//     updatedPrice,
//   );
//   updatedProduct.save();

//   res.redirect("/products");
// };

// exports.postDeleteProduct= (req,res,next) =>{
//   const prodId = req.body.productId;
//   Product.deleteProductById(prodId);
//   res.redirect('/admin/products');
// }

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("admin/products", {
//       prods: products,
//       pageTitle: "Admin Products",
//       path: "/admin/products",
//     });
//   });
// };
