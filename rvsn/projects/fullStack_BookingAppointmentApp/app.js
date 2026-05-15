console.log("Jai shree Hanuman")
const express = require('express');
const app = express();

// const bodyParser = require('body-parser')
// app.use(bodyParser.json({extended:false}))   // while sending data from the html file we will send it in json form now
/**in modern express version we use body parser directly through express and now don't need to install body-parser package separately */
app.use(express.json({extended:false})) 

const path = require('path');
app.use(express.static(path.join(__dirname,'public')))  

const userRoutes = require('./routes/user');
app.use('/',userRoutes);

const userModel = require("./models/User");
const sequelize = require('./util/database');
// sequelize.sync({alter:true})
sequelize.sync()
.then(()=>{
    app.listen(4000);
})
.catch((err)=>{
    console.log(err)
})
