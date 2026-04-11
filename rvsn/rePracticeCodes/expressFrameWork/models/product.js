const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "product-list.json"); //here we want to store data file in specific folder that's why we created path

const readFileData = (callback) => {
  fs.readFile(p, "utf-8", (err, data) => {
    if (err || !data) {
      console.log(err);
      return callback([]); // here we pass empty array in callback so that when .fetchAll get called in for frontend use then the length of the products array is kept at count 0 atleast which will save the program from crash
    }
    let productList = JSON.parse(data); // we need to parse the data into js which we retrieve from the file to use as normal js code
    console.log("productList", productList);
    callback(productList);
  });
}; // this function can also be created inside class but as the fetchAll() is ststic method and save() is normal so we would have been setting more logic to call in both place so it's more conveneient to define it here outside class

module.exports = class Product {
  constructor(t) {
    this.title = t; // here "this" refers to the object which is created with the use of the contructor and "t" parameter get value from the addProduct form input which is sent back by the server and passed in while object creation
  } //  here title is the key set for the values that is getting stored in the object

  save() {
    //  save() is same as function but without function keyword

    this.id = Math.random().toString();   // id should be assigned outside the readFile because it should not depend on the file handling as the id is permanent property of object
    readFileData((savedProductsArr) => {
      // here inner callback function is getting the readFile data from cb1 of getProductsFromFile where it is defined and store it in the new variable which we have passed in callback function

      savedProductsArr.push(this); //as the savedProductsArr is new variable passed in and the data which is got and stored through readFile in it is in array so it becomes array data Type and then new product can also be pushed into it
      fs.writeFile(p, JSON.stringify(savedProductsArr), (err, data) => {
        console.log(err);
      });
    });
    //  Here at first we have retrieved available data from the file and then stored in a new array, every time readDFile runs and then push the newly added product object with the earlier data in the array after that saved that array in the file by converting it in string with writeFile method
  }

  static fetchAll(cb) {
    // static keyword is used here which assures that the method is called on the "products" class and don't touches the object

    readFileData(cb);
  } // here callback is passed because as we know js codes works on sync manner and doesn't wait for async codes to execute further so keep that in pending for later execution and the fs.readFile() is async proerty so when we returning the data from the readFile directly then it execute after the fetchAll() execution already get completed and wherever we call fetchAll() method then it shows undefined so to resolve this, we use callback as when we pass callback function, then while execution pointer get on fs.readFile() and finds the callback in argument then it keeps it in the memory and execute it by calling that cb function where it is defined so whatever we pass in the cb will be availabble for that function to use even when fetchAll() finished earlier
}; //  here actually class is created so that we can define required customized methods and which can we then use at different places
