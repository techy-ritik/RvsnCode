console.log("Jai shree Hanuman")
const express = require('express');
const app = express();

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended:false}))
/**in modern express version we use body parser directly through express and now don't need to install body-parser package separately */
app.use(express.urlencoded({extended:false}))

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
