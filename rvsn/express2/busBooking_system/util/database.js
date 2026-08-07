const mysql = require('mysql2')

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "bus_booking_system",
  password: "Ritikesh@1113",
});

module.exports = pool.promise();