const mySql = require("mysql2");

const pool = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "Ritikesh@1113",
  database: "revision_test_project",
});

module.exports = pool.promise();