const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');


module.exports = class Product {
  constructor(t) {
    this.title = t; // here "this" refers to the object which is created with the use of the contructor and "t" parameter get value from the addProduct form input which is sent back by the server and passed in while object creation
  } //  here title is the key set for the values that is getting stored in the object

  save() {
    //  it is same as function but without function keyword

    const p = path.join(rootDir, "data", "product-list.json"); //here we want to store data file in specific folder that's why we defined path

    fs.readFile(p, (err, data) => {
      let productArr = [];
      if (!err) {
        productArr = JSON.parse(data); // here we have to convert the file data in js format to store it in the array with the use of JSON.parse()
      }
      productArr.push(this);
      fs.writeFile(p, JSON.stringify(productArr), (err, data) => {
        console.log(err);
      });
    });
    //  Here at first we have retrieved available data from the file and then stored in a new array by creating it every time readDFile runs and then push the newly added product object with the earlier data in the array after that saved that array in the file by converting it in string with writeFile method


    // const stringifiedProduct = JSON.stringify(this)
    // fs.appendFile('product-List.json',stringifiedProduct + ",",()=>{
    //     console.log("product added")
    // })  // we could have also use apendFile() to store and update productlist but as we are saving the file in .json format so through this method formatting of the json style will not be fulfilled and it results in error when retrive the data from the file for furhter use.
  }

  static fetchAll(cb) {
    // static keyword is used here which assures that the method is called on the "products" class and don't touches the object

    const p = path.join(rootDir, "data", "product-list.json");
    fs.readFile(p, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return cb([]); // here we pass empty array in callback so that when .fetchAll get called in for frontend use then the length of the products array is kept at count 0 atleast which will save the program from crash
      }
      let productList = JSON.parse(data); // we need to parse the data into js which we retrieve from the file to use as normal js code
      console.log("productList", productList);
      cb(productList);
    });
  } // here callback is passed because as we know js codes works on sync manner and doesn't wait for async codes to execute further so keep that in pending for later execution and the fs.readFile() is async proerty so when we returning the data from the readFile directly then it execute after the fetchAll() execution already get completed and wherever we call fetchAll() method then it shows undefined so to resolve this, we use callback as when we pass callback function, then while execution pointer get on fs.readFile() and finds the callback in argument then it keeps it in the memory and execute it by calling that cb function where it is defined so whatever we pass in the cb will be availabble for that function to use even when fetchAll() finished earlier
};    //  here actually class is created so that we can define required customized methods and which can we then use at different places