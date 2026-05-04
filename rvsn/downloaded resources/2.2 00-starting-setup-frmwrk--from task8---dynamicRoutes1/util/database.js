const mysql = require("mysql2");

const pool = mysql.createPool({
  // here we add pool to establish new connections for multiple query simultanousely with the databse as because we need a new connection is required each time a querry runs so it's not possible to set createConnection manually for every querry execution so with createPool we can establish new connection each time automatically and when query execution got finished connectionn got back to pool
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "Ritikesh@1113",
});


module.exports = pool.promise();  // we export it using .promise() like this because we want to use it as async implimentation and for that promises are better than callbacks because with this code implimentation are more structured using promise chains