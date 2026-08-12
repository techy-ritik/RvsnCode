const express = require('express');
const app = express();

const sequelize = require('./util/database')
const studentModel = require('./models/student')

app.use(express.json());

const studentRoute = require('./routes/student')
app.use(studentRoute);



 
// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
    app.listen(3000, (err) => {
      console.log("server is running on port : 3000");
    });
})
.catch((err)=>{
    console.log(err);
})
