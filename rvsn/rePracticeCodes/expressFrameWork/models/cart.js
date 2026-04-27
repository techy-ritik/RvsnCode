const path = require("path");
const rootDir = require("../util/path");
const fs = require("fs");
const { deleteProductById } = require("./product");

const pCart = path.join(rootDir, "data", "cart.json"); //  we have to create new database file for every model to manage data of that model separately

module.exports = class Cart {
  static addProductToCart(fetchedProductId, fetchedProductPrice) {
    //  here id and productPrice of the product will be passed each time we call this method for adding a product
    fs.readFile(pCart, "utf-8", (err, allProductData) => {
      let cartData = { products: [], totalPrice: 0 }; //  here it will work for both the case whether the cart is already available or not, as when no file for cart is there(or in case of err) the new cart will get created and product will get added with writeFile() in it and if cart is already available then this new cart got replaced with the existing cart in further steps
      if (!err && allProductData) {
        cartData = JSON.parse(allProductData); // here the already available products will get stored in the cartData which contain products[cartProductId , qty] and totalPrice
      }
      // const existingProductIndex = cartData.products.findIndex(
      //   // we use findIndex for getting index of the matching product object from the products array of the cart and here we cannot use indexOf for this purpose bcz it only works for getting index of normal values element of the array
      //   (crntTraversedProduct) =>
      //     crntTraversedProduct.cartProductId === fetchedProductId,
      // ); //  here it again extract the product and there index with it's id for which we hit 'add to cart' , like we have done for fetching single product details in fetchOneProduct() method of product model

      // const existingProduct = cartData.products[existingProductIndex];

      // let updatedProduct;
      // if (existingProduct) {
      //   updatedProduct = { ...existingProduct }; // for updating details of the product which is already in the cart we need to create new product object with the same properties as of the existing Product so we use spread operator which allows to create new variable with exact copy of all the data as of the original one
      //   updatedProduct.qty = updatedProduct.qty + 1; //  as we have copied the existingProduct in updateProduct there will be qty data available in updatedProduct also because as existingProduct contain all the product data, which got saved in cartData where every new product got added through else block where qty is included in the products array

      //   cartData.products[existingProductIndex] = updatedProduct; // here when product is already available in the cart then we just update the products array of the cartData by adding the updatedProduct with updated details in place of the existingProduct
      // } else {
      //   //  here else block condition is mainly used for saving new product in the cartData
      //   updatedProduct = { cartProductId: fetchedProductId, qty: 1 }; //  as initially there will be no product in the cart so it starts with saving product with newly initialized 'cartProductId' in which 'fetchedProductId' will be stored and 'qty' details only, so there will be always only cartProductId, qty and totalprice data will be available in cart file

      //   cartData.products = [...cartData.products, updatedProduct]; // we should use ',' for adding new element in the copied object through spread operator
      //   //                                                           if we are adding product for the first time then we just add new updatedProduct in the cart but it's not same for the existing product
      // }

      /** alt. approch for updating existing and new product */
      const existingProduct = cartData.products.find(
        (crntTraversedProduct =
          crntTraversedProduct.cartProductId === fetchedProductId),
      );
      if (existingProduct) {
        existingProduct.qty++; // we can directly update in the existinProduct as because it is actuaally the refernce of that product element which is stored in the array so when we make changes in this then it got updated in the array
      } else {
        const newProduct = { cartProductId: fetchedProductId, qty: 1 };
        cartData.products.push(newProduct); // here we can also push instead of creating copy of the product and then add new product to it as because .push() method also add new element at the end of array which work same as above approch
      }
      cartData.totalPrice = cartData.totalPrice + +fetchedProductPrice; // totalPrice will increase every time we update cart whether we add new product or add already existing products more and for adding sum in integer form we add '+' sign before fetchedProductPrice

      fs.writeFile(pCart, JSON.stringify(cartData), (err) => {
        console.log(err);
      });
    });
  }

  static deleteCartProductById(deletedCartProdId, deletedProdPrice) {
    fs.readFile(pCart, "utf-8", (err, cartFileData) => {
      if (err) {
        return err;
      }
      const cartData = JSON.parse(cartFileData);
      const updatedCartProds = [...cartData];

      const deletedCartProd = updatedCartProds.products.find(
        (crntTrvrsProd) => crntTrvrsProd.cartProductId === deletedCartProdId,
      ); //  here we have to extract product which we have to delete so that we can get qty of the product added in the cart and with that we can update totalPrice according to no. of qty removed for that product

      updatedCartProds.products = updatedCartProds.products.filter(
        (crntTrvrsProd) => crntTrvrsProd.cartProductId !== deletedCartProdId,
      ); //  here with this filter method we have filtered out the product whose id matching with deletedCartProdId, and like this, that product got deleted from the cart

      updatedCartProds.totalPrice =
        updatedCartProds.totalPrice - deletedProdPrice * deletedCartProd.qty;

      fs.writeFile(pCart, JSON.stringify(updatedCartProds), (err) => {
        console.log(err);
      });
    });
  }
};
