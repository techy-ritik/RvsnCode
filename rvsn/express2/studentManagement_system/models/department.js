const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const department = sequelize.define("department", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});


module.exports = department;