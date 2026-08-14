const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const studentCourses = sequelize.define("studentCourses", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = studentCourses;
