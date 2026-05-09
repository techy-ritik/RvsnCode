console.log("Jay Hanuman");

const path = require("path");
const express = require("express");
const app = express(); // app is  basically a server object which handle requests and runs the server

const bodyParser = require("body-parser"); // this package is use to parse the data recieved through the req.body from the server
app.use(bodyParser.urlencoded({ extended: false })); // It is used to parse recieved data into usable object through req.body
// urlencoded means data is parsed as such it can be used to send in url as querry parameters
// extended : false is used here to keep the parsing format simple and if it change to true the parsing would become advanced and the result output data format got changed

app.use(express.static(path.join(__dirname, "public"))); // with express.static() builtin middleware, folder is statically handled and set as global root of the files inside it by the express for accessing the files inside it anywhere directly , here this set the public folder as static folder globally and files inside this, can we accessed anywhere directly

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes); // '/admin' is used so that to filter out the middleware excution if same route name is present in different router files
app.use("/", shopRoutes);

const error404Controller = require("./controllers/404");
app.use("/", error404Controller.use404);

const sequelize = require("./util/database");
sequelize   
  .sync()
  .then(() => {
    app.listen(3000); // it creates and also starts the server
    //                  we have added in then() of sync bcz we want to start the server once it get confirmed that the database is created and avaialable to handle data
  })
  .catch((err) => {
    console.log(err);
  }); //  here when we use sequelize library with node.js then for creating table or for executing models where databse table is created, we have to run sequelize.sync inside app.js and also starts the server in then() as we know once we get the promise response of database creation or availability then only we can handle any data else there is now use of backend program
        // this sequelize.sync() execution will work for all the models