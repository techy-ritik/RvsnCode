const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "appointment_booking_app",
  "root",
  "Ritikesh@1113",
  { dialect: "mysql", host: "localhost" },
);

module.exports = sequelize;
