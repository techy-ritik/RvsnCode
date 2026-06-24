const express = require("express");

const app = express();




const sequelize = require("./util/database")

sequelize.sync()
.then(()=>{
    app.listen(4000);
})
.catch((err)=>{
    console.log(err);
})