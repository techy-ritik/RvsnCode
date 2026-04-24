const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json",
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, "utf-8", (err, fileContent) => {
    // for handling if empty fileContent in if block we have to add "utf-8"
    if (err || !fileContent) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id; //    as for updating existing product, we require id to be passed through object so we have to add id parameter in the constructor as when new product is created and no id is passed through object then it will be null and it's value further set inside .save() and when the edited product object is created for existing object then the id will be passed through object
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //  here as we are going to use save() method for both add and edit product so we have to handle it according to id value availability where if there is value stored in it that means product exist so it get hndled in if condition for edit product else execution move furthrt and handles add product
    getProductsFromFile((products) => {
      if (this.id) {
        // we are handling edit product here
        const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this; // here we can also directly push 'this' object inside the array but it's more safer to save edited product by creating new coppied array with spread operator which prevents mutation(from modifying the original array)

        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString(); //  as the id usually should be kept outside readFile() but here as the id has to be used for existing product update so we have to keep it inside
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    // here we are extracting single product to show it's details, by using id value which is recieved from controller where findById method is called
    getProductsFromFile((products) => {
      // the data returned from getProductsFromFile() is available in the function which is passed here as callback and it's stored in products argument of this callback function
      // so it means products argument contain list of all the products

      const currentFoundProduct = products.find((p) => p.id === id); // here .find() is inbuilt method of js which traverse over the array internally and each index element get temp. stored in, by creating new variable with each loop which is to be passed as argument in .find() method
      //  so, as here the elements of the products array is in object form, .find() traverse through array and check for id of each element object through 'p.id' by matching it with the id which is recieved as argument, when it's passed while calling findById() method
      cb(currentFoundProduct); // here as the cb is actually the callback function which is passed here as argument so whatever data is sent from here will be available there wherver the callback function is defined
      //  and here it's sending the data of one product whose id is matched with the recieved id
    }); // overall -> ('id' receives data from where findById() is called and 'cb' sends data BACK to where findById() is called
  } // here at first all the product has been fetched by calling getProductsFromFile() and then single product has been selected with the help of product id whose details are to be sent for the user display and then passed that with callback->'cb'
};
