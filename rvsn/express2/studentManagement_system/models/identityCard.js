const Sequelize = require('sequelize')
const sequelize = require('../util/database');

const identityCard = sequelize.define('identityCard',{
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    cardNo:{
        type:Sequelize.INTEGER,
        allowNull:false,
        // unique:true,
    }
})

module.exports = identityCard;