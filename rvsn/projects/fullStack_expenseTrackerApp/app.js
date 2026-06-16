const express = require('express');

const app = express();







const sequelize = require("./util/database");

sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });