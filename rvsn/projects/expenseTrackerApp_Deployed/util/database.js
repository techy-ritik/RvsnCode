const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_SCHEMA,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: process.env.DIALECT,
    host: process.env.DATABASE_HOST,
  },
);

module.exports = sequelize;
