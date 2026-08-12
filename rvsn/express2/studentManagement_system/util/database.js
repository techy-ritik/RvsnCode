const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "student_management_system",
  "root",
  "Ritikesh@1113",
  {
    dialect: "mysql",
    host: "localhost",
  },
);

module.exports = sequelize;