const express = require("express");

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname,"public")));

app.use(express.json({extended:false}));

const adminRoutes = require('./routes/admin');
app.use(adminRoutes);

const sequelize = require("./util/database")
sequelize.sync()
.then(()=>{
    app.listen(4000);
})
.catch((err)=>{
    console.log(err);
})