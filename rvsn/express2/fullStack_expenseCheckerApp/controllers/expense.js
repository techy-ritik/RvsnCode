const path = require("path");

const rootDir = require("../util/path");

const expenseModel = require("../models/expense");

exports.getIndexPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/expense.html"));
};

exports.postAddExpense = (req, res, next) => {
  expenseModel
    .create({
      amount: req.body.xpAmount,
      description: req.body.xpDesc,
      category: req.body.xpCtgry,
    })
    .then((expense) => {
      console.log("new added expense", expense);
      console.log("expense added!!");
      res.status(200).json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getExpenses = (req, res, next) => {
  expenseModel
    .findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  // console.log("req.params.id", req.params.id);
  const expenseId = req.params.id;
  expenseModel
    .findByPk(expenseId)
    .then((expense) => {
      return expense.destroy();
    })
    .then(() => {
      console.log("expense deleted");
      res.status(200).json({ message: "expense deleted successfully...!!" });
    }) 
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditExpense = (req, res, next) => {
  const expenseId = req.params.id;

  expenseModel
    .findByPk(expenseId)
    .then((expense) => {
      console.log("expense to edit", expense);
      res.json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateExpense = (req, res, next) => {
  console.log("update details", req.body);
  const expenseId = req.body.xpId;
  const updatedExpenseObj = {
    amount : req.body.xpAmount,
    description : req.body.xpDesc,
    category : req.body.xpCtgry,
  }

  expenseModel
    .update(updatedExpenseObj, { where: { id: expenseId } })
    .then((result)=>{ // here it only outputs no. of rows affected but not the updated row data so we have to fecth the updated row using id again to send to the client
      return expenseModel.findByPk(expenseId); 
    })
    .then((expense) => {
      console.log("expense updated..!!");
      res.status(200).json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
};
