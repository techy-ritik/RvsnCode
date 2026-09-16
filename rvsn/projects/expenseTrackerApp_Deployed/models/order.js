const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  paymentSessionId:{
    type:Sequelize.STRING,
    allowNull:false
  },
  orderAmount:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  orderCurrency:{
    type:Sequelize.STRING,
    allowNull:false
  },
  paymentStatus:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports = order;