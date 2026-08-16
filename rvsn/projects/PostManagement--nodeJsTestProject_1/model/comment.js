const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const comments = sequelize.define('comments',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
    comment:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = comments;