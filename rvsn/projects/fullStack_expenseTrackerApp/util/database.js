const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "expense_tracker_app",
  "root",
  "Ritikesh@1113",
  {
    dialect: "mysql",
    host: "localhost",
  },
);

module.exports = sequelize;
