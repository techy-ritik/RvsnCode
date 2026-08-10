const express = require('express');

const app = express();

const db = require('./util/database');
const tables = require('./database/tables');

const bookingRoute = require('./routes/booking');

app.use(express.json());

app.use(bookingRoute);

app.listen(4000,(err)=>{
    console.log("server is running on port: 4000")
});