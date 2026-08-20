const express = require('express');
const app = express();

const path = require('path')
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json({extended:false}))

const expenseRoutes = require("./routes/expense");
app.use(expenseRoutes);

const expenseModel = require("./models/expense");


const sequelize = require("./util/database");

// sequelize.sync({alter:true})
sequelize
  .sync()
  .then(() => {
    app.listen(5000,()=>{
      console.log('server is running on port : 5000')
    });
  })
  .catch((err) => {
    console.log(err);
  });