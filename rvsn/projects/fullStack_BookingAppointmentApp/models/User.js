const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement: true
    },
    userName:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        // unique: true,
    },
    phoneNo:{
        type:Sequelize.STRING,
        allowNull:false,
        // unique:true
    }
})


module.exports=User;