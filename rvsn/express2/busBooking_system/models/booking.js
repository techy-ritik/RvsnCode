const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const booking = sequelize.define("booking", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  seatNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = booking;
