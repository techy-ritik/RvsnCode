const mysql = require('mysql2');

const connectionPool = mysql.createPool({
  // here we added createPool instead of createConnection to establish new connections for multiple query simultanousely with the databse as because a new connection is required each time a querry runs so it's not possible to set createConnection manually for every querry execution so with createPool we can establish new connection each time automatically and when query execution got finished connection get back to pool and ready for new connection as the pool can handle
  host: "localhost",
  user: "root",
  database: "expressframework-prctcproject", // schema name is the database here
  password: "Ritikesh@1113",
});

module.exports = connectionPool.promise();  // we export it using .promise() like this because we want to use it as async implimentation and for that promise chains are better than nested callbacks because with this, code implimentation are more structured