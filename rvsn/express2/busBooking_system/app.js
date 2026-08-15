const express = require('express');
const app = express();

app.use(express.json());

const userRoute = require('./routes/user');
const busRoute = require('./routes/bus');
const bookingroute = require('./routes/booking');
app.use('/user',userRoute);
app.use('/bus',busRoute);
app.use('/booking',bookingroute);



require('./models');   // if we import the models with only folder name like this it looks for file name "index.js" only and imports that file and we name it with different names then we have to import that file by adding it in the parenthesis after slash
const sequelize = require("./util/database");

// sequelize.sync({alter:true})
sequelize.sync()
.then(()=>{
    app.listen(4000, (err) => {
    console.log("server is running on port: 4000");
    });
})
.catch((err)=>{
    console.log(err);
})
