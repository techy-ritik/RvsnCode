const express = require('express');
const app = express();

const path = require('path')
app.use(express.static(path.join(__dirname, "public")));

// const bodyParser = require("body-parser"); // this package is use to parse the data recieved through the req.body from the server
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({extended:false}))

const expenseRoutes = require("./routes/expense");
app.use(expenseRoutes);

const expenseModel = require("./models/expense");


const sequelize = require("./util/database");

// sequelize.sync({alter:true})
sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });