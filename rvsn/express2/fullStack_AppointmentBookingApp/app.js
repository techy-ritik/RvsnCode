console.log("Jai shree Hanuman")
const express = require('express');
const app = express();

app.use(express.json({extended:false})) 

const path = require('path');
app.use(express.static(path.join(__dirname,'public')))  

const userRoutes = require('./routes/user');
app.use(userRoutes);

const userModel = require("./models/User");
const sequelize = require('./util/database');
// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
    app.listen(4000);
})
.catch((err)=>{
    console.log(err)
})
