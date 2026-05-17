console.log("Jay Hanuman");

const path = require("path");
const express = require("express");
const app = express(); // app is  basically a server object which handle requests and runs the server

const bodyParser = require("body-parser"); // this package is use to parse the data recieved through the req.body from the server
// app.use(bodyParser.urlencoded({ extended: false })); // It is used to parse recieved data into usable object through req.body
app.use(bodyParser.json({ extended: false }));  // while sending data from the .html file we will send it in json form now because urlencoded is mainly used for file like .ejs
// urlencoded means data is parsed as such it can be used to send in url as querry parameters
// extended : false is used here to keep the parsing format simple and if it change to true the parsing would become advanced and the result output data format got changed

/** in modern express version we can directly use bodyParser through express as it now includes this internally */
// app.use(express.json({ extended: false }));  

app.use(express.static(path.join(__dirname, "public"))); // with express.static() builtin middleware, folder is statically handled and set as global root of the files inside it by the express for accessing the files inside it anywhere directly , here this set the public folder as static folder globally and files inside this, can we accessed anywhere directly

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes); // '/admin' is used so that to filter out the middleware excution if same route name is present in different router files
app.use("/", shopRoutes);

const error404Controller = require("./controllers/404");
app.use("/", error404Controller.use404);

const productModel = require('./models/product');
const userModel = require('./models/user')
productModel.belongsTo(userModel,{constraints:true,onDelete:'CASCADE'});   // here .belongsTo() is used for establishing association between the two tables in which it means that Product table will be connected with the user table and will add an userId column in product table as foreign key which will be the primary key of the user table and it shows that how many product of the product table belongs to single user for which, through userId it is identified (it's like,- a single userId will be added with all the products row to which all those product belongs)
userModel.hasMany(productModel);   // .hasMany() method works the same way as .belongsT() does, as it also establishes association between user and product table and it means that a user will have many Products from the product table i.e. one userId will be available in mutiple product row to which all those product belongs
        //               we can use anyone of the methods for the same work but we use both so that sequelize can generate helper functions for other method implimentations. And usually both are used together for complete association of tables
        //                here we have passed an object in .belongsTo() where we define rules for the association in which "constraints" is set true for the authenticity purpose which means the userId which is get added in the product table must be there in the user table and if unAvailable userId detected then database throws err and "onDelete" is set for -> when any user got deleted from the user table then all the product containing the user's userId will also get deleted automatically


const sequelize = require("./util/database");

sequelize.sync({ alter: true })    // here we use '{alter:true}' for updating the changes which is to be done in the model in the schema which is to be made after once the table is created
  // sequelize
  //   .sync()
    .then((res)=>{
      // as we don't have any add User route yet so here we are adding dummy user for testing and execution of functionalities implimented after association of user and product model
      return userModel.findByPk(1); // it checks in the user table that whether any user with the passed id is available in the table and return the recieved promise response and then it will be handled in next chained .then()
    })
    .then((user)=>{
      if (!user) {
        // this if block will run if the user with the passed id is not available in the table and so here new user will get created and returned
        return userModel.create({
          name: "Ritikesh",
          email: "ritikeshjee@gmail.com",
        });
      }
      return user; // here if the user is not available and the if condition runs then new user will be created and returned and if user available then the user recieved in the response will be returned as it is and then the returned promise response will be handled in next chained .then()
    })
    .then((res) => {
      // console.log(res)
    app.listen(3000); // it creates and also starts the server
    //                  we have added it in then() of sync bcz we want to start the server once it get confirmed that the database is created and avaialable to handle data
  })
  .catch((err) => {
    console.log(err);
  }); //  here when we use sequelize library with node.js then for creating table or for executing models where databse table is created, we have to run sequelize.sync inside app.js and also starts the server in then() as we know once we get the promise response of database creation or availability then only we can handle any data else there is now use of backend program
        // this sequelize.sync() execution will work for all the models