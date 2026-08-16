const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "database_management-app",
  "root",
  "Ritikesh@1113",
  {
    dialect: "mysql",
    host: "localhost",
  },
);


module.exports = sequelize;