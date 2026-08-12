const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Student = sequelize.define('Students',{
    id :{
        type:Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
    },
    name :{
        type : Sequelize.STRING,
        allowNull : false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    age:{
        type : Sequelize.INTEGER,
        allowNull:false,
    }
})

module.exports = Student;