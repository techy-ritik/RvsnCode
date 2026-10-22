const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const downloadedFilesRecord = sequelize.define("downloadedFilesRecord", {
    id:{
        type : Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    fileLink:{
        type : Sequelize.STRING,
        allowNull : false
    }
});

module.exports = downloadedFilesRecord;