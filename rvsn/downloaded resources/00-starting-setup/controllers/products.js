// const products = [];  no need to use products array here for data handling after model creation as data is fully managed in the model files

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const product = new Product(req.body.title); // here new product object is created everytime we submit the addProduct form with the help of constructor which instanciated in the Product class in product.js file of the Model with the input form data recieved from the server and so the title will be the name of the input
  product.save(); // by calling save() method we stored the newly craeted object in the product array which is created in the model
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //   const products = adminData.products;     // not required to use products array through admin.products by import methd after moving this middleware in the controller where products array decalaration is already present

  const fetchedProducts = Product.fetchAll(); // here .fetchAll() method fetch all the products that is stored in the Product array and store in the fetchedProducts
    console.log(fetchedProducts);
  res.render("shop", {
    prods: fetchedProducts,
    pageTitle: "Shop",
    path: "/",
    hasProducts: fetchedProducts.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
