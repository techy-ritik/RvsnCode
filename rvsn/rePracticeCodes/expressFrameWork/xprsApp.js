console.log("Jay Hanuman")

const path = require('path');
const express = require('express');
const app = express();  // app is  basically a server object which handle requests and runs the server


const bodyParser = require('body-parser'); // this package is use to parse the data recieved through the req.body from the server
app.use(bodyParser.urlencoded({extended:false}));  // It is used to parse recieved data into usable object through req.body
                                                    // urlencoded means data is parsed as such it can be used to send in url as querry parameters
                                                    // extended : false is used here to keep the parsing format simple and if it change to true the parsing would become advanced and the result output data format got changed

const adminRoutes = require('./routes/admin')
const shopRoutes = require("./routes/shop");

app.use('/admin',adminRoutes); // '/admin' is used so that to filter out the middleware excution if same route name is present in different router files
app.use('/',shopRoutes);

app.use('/',(req,res,next)=>{  //this middleware is used to handle all the other routes which is not specificially handled by different route handling middlewares and thus it protects the website from showing irregular text to the user
  res.status(404).sendFile(path.join(__dirname,'views','404.html'))   // status code is set to 404(used for page not found) which will be responded by the sever when enterd route will not found
})

app.listen(3000);  // it creates and also starts the server