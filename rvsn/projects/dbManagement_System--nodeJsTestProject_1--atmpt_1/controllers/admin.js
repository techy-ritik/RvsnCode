const path = require("path");
const rootDir = require("../util/path");

const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const allModels = {};
exports.allModels = allModels;

exports.getIndexPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/index.html"));
};

exports.postCreateTable = (req, res, next) => {
  const tableName = req.body.tableName;
  const fields = req.body.fields;
  // console.log("tableName,fields", tableName, fields);

  const columns = {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  };
  fields.forEach((field) => {
    columns[field.fieldName] = {
      // here we have to use bracket notation for storing new field in the object by extracting it from recieved fields as dot notation can only be used if we already have the exact key name
      type: Sequelize[field.type],
      allowNull: false,
    };
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

  let availableTables;
  let newTable;
  sequelize
    .getQueryInterface()
    .showAllTables()
    .then((tables) => {
      availableTables = tables;

      newTable = sequelize.define(tableName, columns, {
        freezeTableName: true, // with this, the exact table name will be saved which is entered by the user
      });
      return newTable.sync();

    })
    .then((result) => {
      const currentTableInTables = availableTables.find(
        (table) => table === tableName.toLowerCase(),
      );
      console.log("currentTableInTables", currentTableInTables);

      if (!currentTableInTables) {
        console.log("table created successfully...");
        allModels[tableName.toLowerCase()] = newTable;
        console.log("allModels", allModels);

        return res.status(200).json(tableName.toLowerCase());
      }
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTables = (req, res, next) => {
  sequelize
    .getQueryInterface().showAllTables() // here we are using .getQueryInterface().showAllTables() to fetch all the table list available in the schema
    .then((tables) => {
      console.log("available tables", tables);
      tables.forEach((table) => {
        console.log("table-", table);
        
        sequelize.getQueryInterface().describeTable(table)
          .then((columns) => {
            allModels[table] = sequelize.define(table, columns, {
              freezeTableName: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
      res.json(tables);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteTable=(req,res,next)=>{
  const currentTable = allModels[req.params.currentTable];
  currentTable.drop()
  .then((result)=>{
    console.log('table deleted...');
    res.status(200).json({message:'table deleted successfully'})
  })
  .catch(err=>{
    console.log(err);
  })
}