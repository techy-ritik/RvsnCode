console.log("Jay Hanuman")
const express = require('express');
const bodyParser = require('body-parser'); // this package is use to parse the data recieved through the req.body from the server

const app = express();  // app is  basically a server object which handle requests and runs the server

app.use(bodyParser.urlencoded({extended:false}));  // It is used to parse recieved data into usable object through req.body
                                                    // urlencoded means data is parsed as such it can be used to send in url as querry parameters
                                                    // extended : false is used here to keep the parsing format simple and if it change to true the parsing would become advanced and the result output data format got changed


app.use("/", (req, res, next) => {
  console.log("in the 1st middleware");
//   console.log("URL:", req.url, "Method:", req.method);
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("in the add product middleware"); 
  res.send('<form action="/product" method="POST">product name:- <input type="text" name="title"> Product Size:-<input type="number" name="size"> <button type="submit">add product</button></form>');
});

app.post("/product",(req,res,next)=>{  // we can use .get or .post in place of .use as for which method incoming request we are using this middleware and route. (Here .post is used bcz incoming request is post method of the form)
    console.log(req.body); // data sent back by the server which we Post on the server can we recived through req.body
    res.redirect("/");
})

app.use("/", (req, res, next) => {
  console.log("in the 3rd middleware");
//   console.log("URL:", req.url, "Method:", req.method);
  res.send("<h1>Jay Hanuman Gyan Gun sagar</h1>"); // send default html responses to the server without manually setting the content type Header
});


app.listen(3000);  // it creates and also starts the server