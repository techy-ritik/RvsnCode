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
    fs.readFile(p, 'utf-8', (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; //  here it will work for both the case whether the cart is already available or not, as when no file for cart is there(or in case of err) the new cart will get created and product will get added in it and if cart is already available then this new cart got replaced with the existing cart in further steps

      if (!err && fileContent) {
        cart = JSON.parse(fileContent);
        console.log("cart", cart);
      }

      const existingProductIndex = cart.products.findIndex(p => p.id === id); // we use findIndex for getting index of the matching product object from the products array of the cart and here we cannot use indexOf for this purpose bcz it only works for getting index of normal values element of the array
      //                                                                                  here it again extract the product with it's id for which we hit 'add to cart' like we have done for fetching single product details in findById() method of product model
      console.log('existingProductIndex',existingProductIndex)
      const existingProduct = cart.products[existingProductIndex];
      console.log("existingProduct", existingProduct);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct }; // for updating details of the product which is already in the cart we need to create new product object with the same properties as of the existing Product so we use spread operator which allows to create new variable with exact copy of all the data as of the original one
        updatedProduct.qty = updatedProduct.qty + 1; //  as we have copied the existingProduct in updateProduct there will be qty data available in updatedProduct also
        console.log("updatedProduct of if", updatedProduct);

        cart.products = [...cart.products]; // this line is not required at all as i've added here only bcz trainer did that
        cart.products[existingProductIndex] = updatedProduct; // here we are updating the products array of the cart as adding the updatedProduct with updated details in place of the existingProduct
        
        // existingProduct.qty++;   // here we can also update existing products data by directly making changes to it and there is no need make new copy of that product and then change data and then again save it at that index because the existingProduct is already the refernece of the array so whatever changes we make to existingProduct will get updated to the array directly and for that only product element is required and no need to get it's index
      
      } else {
        updatedProduct = { id: id, qty: 1 }; //  as initially there will be no product in the cart so it starts with saving product with 'id' and here newly initialized 'qty' details only so there will be always only id, qty and totalprice data will be available in cart file
        console.log("updatedProduct of else", updatedProduct);
        cart.products = [...cart.products, updatedProduct]; // here if we are adding product for the first time then we just add new updatedProduct in the cart but it's not same for the existing product
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteCartProductById(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        // console.log(err);
        return;
      }
      let cart = JSON.parse(fileContent);

      const updatedCart = {...cart};
      const product = updatedCart.products.find(prod=>prod.id===id)   // here we have to extract product so that we can get qty of the product added in the cart and with that we can update totalPrice according to no. of qty removed for that product

      updatedCart.products = updatedCart.products.filter(prod=>prod.id !== id)   // with this filter method we have filtered out the matching id product as we have done in product model
      updatedCart.totalPrice = cart.totalPrice - productPrice * product.qty 
    
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb){
    fs.readFile(p,'utf-8',(err,fileContent)=>{
      const cart = JSON.parse(fileContent);
      if(err){
        cb(null);
      }else{
        cb(cart);
      }
    })
  }

};

// this model is for managing products data for the cart section of the project
