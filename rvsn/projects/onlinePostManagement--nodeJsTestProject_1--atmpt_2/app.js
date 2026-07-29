const express = require('express');

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname,'public')))

app.use(express.json({extended:false}));

const postRouter = require('./routes/post');
app.use(postRouter);


const postModel = require('./model/post');

const sequelize = require('./util/database');
// sequelize.sync({alter:true})
sequelize.sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });