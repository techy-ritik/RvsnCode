const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const adminRoute = require('./routes/admin')

app.use(adminRoute);

app.use('/',(req, res)=>{
    res.status(404).send('<h1>Page not found !</h1>')
})

app.listen(4000);
