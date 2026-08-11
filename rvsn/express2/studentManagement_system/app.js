const express = require('express');
const app = express();

const db = require('./util/database')
const studentTable = require('./database/tables');
studentTable();

app.use(express.json());

const studentRoute = require('./routes/student')
app.use(studentRoute);




app.listen(3000,(err)=>{
    console.log("server is running on port : 3000")
})