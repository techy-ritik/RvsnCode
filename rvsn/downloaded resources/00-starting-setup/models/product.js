// const products = [];

const fs = require("fs");
const path = require("path");

module.exports = class Product {  // we generally keep class name starts with capital letter
  constructor(t) {
    this.title = t; // here "this" refers to the object which is created with the use of the contructor and "t" parameter get value from the addProduct form input which is sent back by the server and passed in while object creation
  } //  here title is the key set for the values that is getting stored in the object

  save() {
    //  save() is same as function but without function keyword

    // products.push(this); // so here when we push this in the array that means we are storing complete object in it

    const p = path.join(
      path.dirname(process.mainModule.filename), //here we want to store data file in specific folder that's why we defined path
      "data",
      "productsList.json",
    ); // we can also import and use helper util path for root directory here
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent); // here we have convert the file data in js format to store it in the array with the use of JSON.parse()
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
      // Here at first we have to retrieve available data from the file and then store in a new array by creating it every time readDFile runs and then push the newly added product object with the earlier data in the array after that save that array in the file by converting it in string with writeFile method
    });
  }

  static fetchAll(cb) {
    // static keyword is used here which assures that the method is called on the "products" class and don't touches the object
    // return products;
    const p = path.join(
      path.dirname(process.mainModule.filename), //here we want to store data file in specific folder that's why we defined path
      "data",
      "productsList.json",
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent)); // we need to parse the data into js which we retrieve from the file to use as normal js code
    });
  }
}; //  here actually class is created so that we can define required customized methods and which can we then use at different places
