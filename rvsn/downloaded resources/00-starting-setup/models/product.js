// const products = [];

const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename), //here we want to store data file in specific folder that's why we defined path
  "data",
  "productsList.json",
); // we can also import and use helper util path for root directory here

const getProductsFromFile = (cb1) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb1([]);
    }
    cb1(JSON.parse(fileContent)); // we need to parse the data into js which we retrieve from the file to use as normal js code
  });
};

module.exports = class Product {
  // we generally keep class name starts with capital letter
  constructor(t) {
    this.title = t; // here "this" refers to the object which is created with the use of the contructor and "t" parameter get value from the addProduct form input which is sent back by the server and passed in while object creation
  } //  here title is the key set for the values that is getting stored in the object

  save() {
    //  save() is same as function but without function keyword

    getProductsFromFile((tempProductsStore) => {
      // here inner callback function is getting the readFile data from cb1 of getProductsFromFile where it is defined and store it in the new variable which we have passed in callback function
      tempProductsStore.push(this); // as the tempProductsStore is new variable passed in and the data which is got and stored through readFile in it is in array so it becomes array data Type and then new product can also be pushed into it
      fs.writeFile(p, JSON.stringify(tempProductsStore), (err) => {
        console.log(err);
      });
    });

    // Here at first we have to retrieve available data from the file and then store in a new array by creating it every time readDFile runs and then push the newly added product object with the earlier data in the array after that save that array in the file by converting it in string with writeFile method
  }

  static fetchAll(cb) {
    // static keyword is used here which assures that the method is called on the "products" class and don't touches the object

    getProductsFromFile(cb); // we call the already defined method where readFile is executed and we pass cb as argument here so that it can fetch the parsed file data from the readFile and then sent to cb of fetchAll() so that it can be used wherever fetchAll() is called
  }
};

//  here actually class is created so that we can define required customized methods and which can we then use at different places
