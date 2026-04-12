const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    // here we are extracting single product to show it's details, by using id value which is recieved from controller where findById method is called
    getProductsFromFile((products) => {  // the data returned from getProductsFromFile() is available in the function which is passed here as callback and it's stored in products argument of this callback function
                                            // so it means products argument contain list of all the products

      const currentFoundProduct = products.find((p) => p.id === id);   // here .find() is inbuilt method of js which traverse over the array internally and each index element get temp. stored in, by creating new variable with each loop which is to be passed as argument in .find() method
                                                                        //  so, as here the elements of the products array is in object form, .find() traverse through array and check for id of each element object through 'p.id' by matching it with the id which is recieved as argument, when it's passed while calling findById() method 
      cb(currentFoundProduct);  // here as the cb is actually the callback function which is passed here as argument so whatever data is sent from here will be available there wherver the callback function is defined
                                //  and here it's sending the data of one product whose id is matched with the recieved id
    });  // overall -> ('id' receives data from where findById() is called and 'cb' sends data BACK to where findById() is called

  } // here at first all the product has been fetched by calling getProductsFromFile() and then single product has been selected with the help of product id whose details are to be sent for the user display and then passed that with callback->'cb' 
};
