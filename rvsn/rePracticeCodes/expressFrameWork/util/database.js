const Sequelize = require("sequelize"); // sequelize package is imported and stored in a constant so that we can use it further for creating objects

const sequelize = new Sequelize(
  "expressframework.e-shop",
  "root",
  "Ritikesh@1113",
  {
    dialect: "mysql",
    host: "localhost",
  },
); // we can pass all the details for connecting the databse through object of Sequelize in the exact order of(databse(schema name),usename,password,options) and then this object for implementing further sql queries
// here we pass 4th argument as object where we have to set that with which database engines we are going to use the sequelize like here we use mysql and the host on which we will work.

// here also, we have actually set connection Pool with the use of sequelize, as we have did with mysql below

module.exports = sequelize;








///**  sequelize also implements the following mysql code internally

/** we have used mysql initially for working with databse of sql and running queries before we have started using sequelize */

// const mysql = require('mysql2');

// const connectionPool = mysql.createPool({
//   // here we added createPool instead of createConnection to establish new connections for multiple query simultanousely with the databse as because a new connection is required each time a querry runs so it's not possible to set createConnection manually for every querry execution so with createPool we can establish new connection each time automatically and when query execution got finished connection get back to pool and ready for new connection as the pool can handle
//   host: "localhost",
//   user: "root",
//   database: "expressframework-prctcproject", // schema name is the database here
//   password: "Ritikesh@1113",
// });

// module.exports = connectionPool.promise();  // we export it using .promise() like this because we want to use it as async implimentation and for that promise chains are better than nested callbacks because with this, code implimentation are more structured
