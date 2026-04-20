const path = require("path");
const fs = require("fs");

const p = path.join(
  //  we have to create new database file for every model to manage data of that model separately
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json",
);

module.exports = class Cart {
  // here we haven't created constructor because there is no need to create new object of cart every a product got added instead we have to just manage the already existing cart object

  // functionality what we are going to implement here :- * fetch the previous cart
  //                                                     * Analyze the cart i.e.=> Find existing product
  //                                                    * Add new product which increase the quantity

  static addProduct(id, productPrice) {
    //  here id and productPrice of the product will be passed each time we call this method for adding a product
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; //  here it will work for both the case whether the cart is already available or not, as when no file for cart is there(or in case of err) the new cart will get created and product will get added in it and if cart is already available then this new cart got replaced with the existing cart in further steps

      if (!err) {
        cart = JSON.parse(fileContent);
        console.log("cart", cart);
      }

      const existingProductIndex = cart.products.findIndex((p) => p.id === id); // we use findIndex for getting index of the matching product object from the products array of the cart and here we cannot use indexOf for this purpose bcz it only works for getting index of normal values element of the array
      //                                                                                  here it again extract the product with it's id for which we hit 'add to cart' like we have done for fetching single product details in findById() method of product model
      const existingProduct = cart.products[existingProductIndex];
      console.log("existingProduct", existingProduct);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct }; // for updating details of the product which is already in the cart we need to create new product object with the same properties as of the existing Product so we use spread operator which allows to create new variable with exact copy of all the data as of the original one
        updatedProduct.qty = updatedProduct.qty + 1; //  as we have copied the existingProduct in updateProduct there will be qty data available in updatedProduct also 

        cart.products = [...cart.products]; // this line is not required at all as i've added here only bcz trainer did that
        cart.products[existingProductIndex] = updatedProduct; // here we are updating the products array of the cart as adding the updatedProduct with updated details in place of the existingProduct
      } else {
        updatedProduct = { id: id, qty: 1 }; //  as initially there will be no product in the cart so it starts with saving product with 'id' and here newly initialized 'qty' details only so there will be always only id, qty and totalprice data will be available in cart file
        cart.products = [...cart.products, updatedProduct]; // here if we are adding product for the first time then we just add new updatedProduct in the cart but it's not same for the existing product
      }
      cart.totalPrice = cart.totalPrice + productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};

// this model is for managing products data for the cart section of the project
