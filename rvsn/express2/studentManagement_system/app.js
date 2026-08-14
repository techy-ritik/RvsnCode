const express = require('express');
const app = express();

const sequelize = require('./util/database')
require('./models');  // we can import all the files in the model folder with this


app.use(express.json());

const studentRoute = require('./routes/student')
app.use('/students',studentRoute);
const courseRoute = require('./routes/courses');
app.use('/courses',courseRoute);


 
// sequelize.sync({alter:true})
sequelize.sync()
.then(()=>{
    app.listen(3000, (err) => {
      console.log("server is running on port : 3000");
    });
})
.catch((err)=>{
    console.log(err);
})
