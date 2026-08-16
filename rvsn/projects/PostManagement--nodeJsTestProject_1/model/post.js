const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Post = sequelize.define("Post", {
  id: {
    type: Sequelize.INTEGER,
    notNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  postLink: {
    type: Sequelize.TEXT,
    notNull: true,
  },
  postDesc: {
    type: Sequelize.STRING,
    notNull: true,
  },
});


module.exports = Post;