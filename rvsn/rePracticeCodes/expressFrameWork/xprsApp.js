console.log("Jay Hanuman")

const express = require('express');
const app = express();  // app is  basically a server object which handle requests and runs the server

const bodyParser = require('body-parser'); // this package is use to parse the data recieved through the req.body from the server
app.use(bodyParser.urlencoded({extended:false}));  // It is used to parse recieved data into usable object through req.body
                                                    // urlencoded means data is parsed as such it can be used to send in url as querry parameters
                                                    // extended : false is used here to keep the parsing format simple and if it change to true the parsing would become advanced and the result output data format got changed

const adminRoutes = require('./routes/admin')
const shopRoutes = require("./routes/shop");

app.use(adminRoutes);
app.use(shopRoutes);


app.listen(3000);  // it creates and also starts the server