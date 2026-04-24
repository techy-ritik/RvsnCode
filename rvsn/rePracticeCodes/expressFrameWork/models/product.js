const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "product-list.json"); //here we want to store data file in specific folder that's why we created path

const readFileData = (callback) => {
  fs.readFile(p, "utf-8", (err, data) => { // here when we add "utf-8" encoding then only the data reutrns as string data type when there is no data and without utf-8 it returns as buffer, in that case data will not be considered as empty and if condition will not be fulfilled then with "!data" and no data error will not be handled in if block so execution passes in else block where JSON.parse tries to convert the data but due to no data program get crashed
    if (err || !data) {
      console.log(err);
      return callback([]); // here we pass empty array in callback so that when .fetchAll get called in for frontend use then the length of the products array is kept at count 0 atleast which will save the program from crash
    }
    let productList = JSON.parse(data); // we need to parse the data into js which we retrieve from the file to use as normal js code
    console.log("productList", productList);
    callback(productList); // this callback send all product data through callback wherever readFileData() is called
  });
}; // this function can also be created inside class but as the fetchAll() is ststic method and save() is normal so we would have been setting more logic to call in both place so it's more conveneient to define it here outside class

module.exports = class Product {
  constructor(t,price,productId) {
    this.title = t; // here "this" refers to the object which is created with the use of the contructor and the parameters('t','price') get value from the addProduct form input which is sent back by the server and passed in while object creation
    this.price = price;
    this.id= productId;  
     // we can add as many number of parameters in constructor as we want and while creating object we need not to pass exact same no. of arguments as only those arguments which is recieved through object is get value stored in it, and other parameter remain undefined or we can pass null for those parameters through object and it does not cause any error. e.g.(like in add product when save() is called only title and price get value but id remain undefined or null and later in the function id get it's value
    //  here ("title","price","id") is the key set for the values that is getting stored as object in the file
  } // and here now our product object is ready with all the input values added inside it and it is referenced with 'this' keyword for accessing it

  save() {
    //  save() is same as function but without function keyword

    this.id = Math.random().toString(); // id should be assigned outside the readFile because it should not depend on the file handling as the id is permanent property of object
    readFileData((savedProductsArr) => {
      // here inner callback function is getting the readFile data from cb1 of getProductsFromFile where it is defined, and store it in the new variable which we have passed in callback function

      savedProductsArr.push(this); //as the savedProductsArr is new variable passed in and the data which is got and stored through readFile in it is in array so it becomes array data Type and then new product can also be pushed into it
      fs.writeFile(p, JSON.stringify(savedProductsArr), (err, data) => {
        console.log(err);
      });
    });
    //  Here at first we have retrieved available data from the file and then stored in a new array, every time readDFile runs and then push the newly added product object with the earlier data in the array after that saved that array in the file by converting it in string with writeFile method
  }

  updateEditedProduct(){
    readFileData((savedProductsArr)=>{
      const editedProductIndex = savedProductsArr.findIndex(
        (currentSavedProduct) => {
          return currentSavedProduct.id == this.id;
        },
      ); // here we are extracting index of the product which is requested for edit through the id which is recieved through object which is created for edited product in the postEditProduct controller
      console.log("editedProductIndex", editedProductIndex);

      // savedProductsArr[editedProductIndex] = this;  // and as we know 'this' keyword refers to the current object which is created by using this model's constructor and passed to this model so here 'this' refers to the current edited product which is passed here by calling updateEditedProduct() method and so it has all the updated details of the updated product with that product's id so we can replace the previous saved product at that index from the newly edit product by string "this";

      const updatedProductsArr = [...savedProductsArr];
      updatedProductsArr[editedProductIndex] = this; // here as we can directly push 'this' object inside the saveedProductsArr array but it's more safer to save edited product by creating new coppied array with spread operator which prevents mutation(from modifying the original array)
      //  here now array has all updated products
      fs.writeFile(p, JSON.stringify(updatedProductsArr), (err) => {
        console.log(err);
      });
    })
  }
    //   we can also impliment update functionality of edited product inside save() and it is done in the trainer's downloaded resources project



  static fetchAll(cb) {
    // static keyword is used here which assures that the method is called on the "products" class and don't touches the object

    readFileData(cb); // ** dataFlow of callbacks :- as cb is actually an argument which carry the function which is passed in fetchAll when we call it anywhere, and then that function is transfered in readFileData() when we pass same cb in it and then that function is sent as callback by passing argument where readFileData() is defined so whatever readFileData() is returning it will be available for any function to use which is passed in the readFileData()
  } // here callback is passed because as we know js codes works on sync manner and doesn't wait for async codes to execute further so keep that in pending for later execution and the fs.readFile() is async proerty so when we returning the data from the readFile directly then it execute after the fetchAll() execution already get completed and wherever we call fetchAll() method then it shows undefined so to resolve this, we use callback as when we pass callback function, then while execution pointer get on fs.readFile() and finds the callback in argument then it keeps it in the memory and execute it by calling that cb function where it is defined so whatever we pass in the cb will be availabble for that function to use even when fetchAll() finished earlier

  static fetchOneProduct(currentId, cb) {
    readFileData((allProducts) => {
      // the data returned from readFileData() is available in the function which is passed here as callback and it's stored in allProducts argument of this callback function
      // so it means allProducts argument contain list of all the products

      const extractedProductById = allProducts.find((crntProdOfArray) => {
        // here .find() is inbuilt method of js which traverse over the array internally and each index element get temp. stored in, by creating new variable with each loop which is to be passed as argument in .find() method and that variable here is - 'crntProductOfArray'

        return crntProdOfArray.id === currentId; //  so, as here the elements of the allProducts array is in object form, .find() traverse through array and check for id of each element object through 'crntProdOfArray.id' by matching it with the 'currentId' which is recieved as argument-> when it's passed while calling fetchOneProduct() method
      });

      console.log("extractedProductById", extractedProductById);
      cb(extractedProductById); // here as the cb is basically the callback function which is passed here as argument so whatever data is sent from here will be available there, wherver the callback function is defined
      //  and here it's sending the data of one product whose id is matched with the recieved id
    });
    //overall here-> ('currentId' receives data from where findById() is called and 'cb' sends data BACK to where findById() is called
    // whole execution context of fetchOneProduct() -> at first all the product has been fetched by calling readFileData() and then single product has been selected with the help of product id whose details are to be sent for the user display and then passed that with callback->'cb'
  }
};

//  here actually class is created so that we can define required customized methods and which can we then use at different places
