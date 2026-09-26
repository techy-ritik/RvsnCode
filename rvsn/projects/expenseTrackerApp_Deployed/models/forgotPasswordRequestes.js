const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const forgotPasswordRequest = sequelize.define("forgotPassowrdRequest", {
    id:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
    },
    isActive:{
        type:Sequelize.BOOLEAN,
    }
});

module.exports = forgotPasswordRequest;