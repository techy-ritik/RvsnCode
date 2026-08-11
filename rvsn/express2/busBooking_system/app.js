const express = require('express');

const app = express();

const db = require('./util/database');
const tables = require('./database/tables');
app.use(tables);

app.use(express.json());

const userRoute = require('./routes/user');
const busRoute = require('./routes/bus');
app.use('/user',userRoute);
app.use('/bus',busRoute);

app.listen(4000,(err)=>{
    console.log("server is running on port: 4000")
});