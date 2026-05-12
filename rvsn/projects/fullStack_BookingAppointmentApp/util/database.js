const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "booking_appointment_app",
  "root",
  "Ritikesh@1113",
  { dialect: "mysql", host: "localhost" },
);

module.exports = sequelize;
