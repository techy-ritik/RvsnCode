const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const payment = sequelize.define("payment", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amountPaid :{
    type : Sequelize.DOUBLE,
    allowNull: false,
  },
  paymentStatus:{
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = payment;
