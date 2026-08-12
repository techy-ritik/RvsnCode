const express = require('express');
const app = express();

app.use(express.json());

const userRoute = require('./routes/user');
const busRoute = require('./routes/bus');
app.use('/user',userRoute);
app.use('/bus',busRoute);



const userModel = require('./models/user');
const busModel = require('./models/bus');
const bookingModel = require('./models/booking');
const paymentModel = require('./models/payment');
const sequelize = require("./util/database");

// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
    app.listen(4000, (err) => {
    console.log("server is running on port: 4000");
    });
})
.catch((err)=>{
    console.log(err);
})
