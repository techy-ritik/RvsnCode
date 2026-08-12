const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const bus = sequelize.define("bus", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  busNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalSeats: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = bus;
