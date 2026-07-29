const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  "social_media-post_management",
  "root",
  "Ritikesh@1113",
  {
    dialect: "mysql",
    host: "localhost",
  },
);

module.exports = sequelize;