const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  "bus_booking_system",
  "root",
  "Ritikesh@1113",
  {
    dialect:"mysql",
    host: "localhost"
  }
);

module.exports = sequelize;