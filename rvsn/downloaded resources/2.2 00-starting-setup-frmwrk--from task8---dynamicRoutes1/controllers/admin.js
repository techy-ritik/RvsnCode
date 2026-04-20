const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add&Edit-product', {    //  as the form which is used for add product will be same as what we use while editing the product so a single view for bith created as add&Edit-product
    pageTitle: 'Add Product',
    path: '/admin/add-product',   
                                            // here path will remain named '/add-product', as it directs from the url to router and then from router to controller's middleware where it's defined that what functionality we have to impliment on that url so here now it will render 'add&Edit-product' which has nothing to do with path
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit    // req.query works like an object which check for the keys of query parameters available in the url for that we add the same variable after the req.query. which we like to get from the url and then value of that key get stored here in editMode and if it can't find in the url then here editMode remain undefined
  if(!editMode){   // in this condition if no query params are found with this key irrespective of true or false then it will redirect it to home page
    return res.redirect('/');
  }
  res.render("admin/add&Edit-product", {  //  as the form which is used for add product will be same as what we use while editing the product so a single view for both are created as add&Edit-product
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    //                                here path will be named as '/edit-product' so that it directs to this middleware and then we can use this middleware to add functionality for editing of the product on the form that will open on this route
    editing : editMode,  // for getting value of editing dynamically as received by the server we keep it's value as editMode as editMode will get it's value whether it will be trur or false from the url
  });
};


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
