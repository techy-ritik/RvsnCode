const path = require("path");
const rootDir = require("../util/path");

const adminController = require('./admin')

const allModelsTables = adminController.allModels;
exports.getTableRecords = (req, res, next) => {
    let currentTable = req.params.table;
    console.log('table to find',currentTable);
    console.log("allModels", allModelsTables);
    console.log(
      "tables in models in getTableTRecords",
      allModelsTables[currentTable],
    );
    currentTable = allModelsTables[currentTable];     // currentTable fetched from model on which the sequelize methods can be used

    currentTable.findAll()
      .then((tableRecords) => {
        console.log("tableRecords", tableRecords);

        const fields = Object.keys(currentTable.rawAttributes);  // here this method is used to extract the column names of the table

        res.json({ fields: fields, fieldsData: tableRecords });
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.postTableRecords=(req,res,next)=>{
  console.log("post records data", req.body);
  const currentTable = allModelsTables[req.body.currentTable];
  // console.log("currentTable", currentTable);
  const fields = Object.keys(currentTable.rawAttributes);
  console.log("fields",fields);

  let currentRecordObj ={};
  fields.forEach((field,index)=>{
    if(index>0 && index<fields.length-2){
      currentRecordObj[field] = req.body[field];
    }
  })
  console.log("currentRecordObj",currentRecordObj);
  currentTable.create(currentRecordObj)
  .then((currentRecord)=>{
    console.log("record added!!!!....")
    console.log("currentRecord",currentRecord)
    res
      .status(200)
      .json({ record: currentRecord, fields : fields });
  })
  .catch((err)=>{
    console.log(err);
  })
}

exports.deleteRecord = (req,res,next)=>{
  // console.log("req.params",req.params.currentTable)

  const currentTable = allModelsTables[req.params.currentTable];

  currentTable.findByPk(req.params.id)
  .then((currentRecord)=>{
    console.log("currentRecord",currentRecord);
    return currentRecord.destroy();
  })
  .then((result)=>{
    res.status(200).json({message:"record deleted"})
  })
  .catch((err)=>{
    console.log(err)
  })
}