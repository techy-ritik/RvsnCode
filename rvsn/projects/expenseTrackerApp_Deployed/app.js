const express = require('express');
const app = express();

const path = require('path')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('views'))

const userController = require('./controllers/user');
app.get('/',userController.getSignUpPage);

app.use(express.json({ extended: false }));

const userRoute = require('./routes/user');
app.use('/user',userRoute)
const expenseRoute = require("./routes/expense");
app.use('/expense',expenseRoute);
const paymentRoute = require('./routes/payment');
app.use('/payments',paymentRoute);

require('./models');
const orderModel = require('./models/order')

const sequelize = require("./util/database");

// sequelize.sync({alter:true})
sequelize.sync()
  .then(() => {
    app.listen(5000,()=>{
      console.log('server is running on port : 5000')
    });
  })
  .catch((err) => {
    console.log(err);
  });