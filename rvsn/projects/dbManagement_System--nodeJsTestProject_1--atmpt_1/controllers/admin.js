const path = require('path');
const rootDir = require('../util/path')

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

exports.getIndexPage = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views/index.html'));
}

exports.postCreateTable = (req,res,next)=>{
    const tableName = req.body.tableName;
    const fields = req.body.fields;
    // console.log("tableName,fields", tableName, fields);

    const columns = {
        id:{
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }        
    }
    fields.forEach(field => {
        columns[field.fieldName] = {        // here we have to use bracket notation for storing new field in the object by extracting it from recieved fields as dot notation can only be used if we already have the exact key name
            type : Sequelize[field.type],
            allowNull: false
        }
    });
    // console.log("coulumns",columns)

    /** 1st approach */
    // sequelize
    //   .getQueryInterface()
    //   .createTable(tableName, columns) // here we are using .getQueryInterface().createTable() for creating dynamic table by passing received table name and fields submitted by the user
    //   .then((result) => {
    //     console.log("result", result);
    //     res.status(200).json({ message: "table created successfully" });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    /**alt. approach */
    const newTable = sequelize.define(tableName,columns)

    newTable.sync({alter:true})
    .then((table)=>{
        console.log("result",table)
        res.status(200).json(tableName);
    })
    .catch(err=>{
        console.log(err);
    })
}

