const path = require("path");
const rootDir = require("../util/path");

const expenseModel = require("../models/expense");

exports.getExpensePage = (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views/expense.html"));
};

exports.postAddExpense = (req, res, next) => {
  const logedInUserId = req.user.id;
  console.log("logedInUserId", logedInUserId);

  expenseModel
    .create({
      amount: req.body.xpAmount,
      description: req.body.xpDesc,
      category: req.body.xpCtgry,
      UserId: logedInUserId,
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
  const logedInUserId = req.user.id;

  expenseModel
    .findAll({ where: { UserId: logedInUserId } })
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const logedInUserId = req.user.id;
  const expenseId = req.params.id;
  console.log("logedInUserId", logedInUserId);
  expenseModel
    .findOne({ where: { id: expenseId, UserId: logedInUserId } })
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
  const logedInUserId = req.user.id;
  const expenseId = req.params.id;
  // console.log("logedInUserId", logedInUserId);
  expenseModel
    .findOne({ where: { id: expenseId, UserId: logedInUserId } })
    .then((expense) => {
      console.log("expense to edit", expense);
      res.json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateExpense = (req, res, next) => {
  // console.log("update details", req.body);
  const expenseId = req.body.xpId;
  const logedInUserId = req.user.id;
  
  expenseModel
    .findOne({ where: { id: expenseId, UserId: logedInUserId } })
    .then((expense) => {
      expense.amount = req.body.xpAmount;
      expense.description = req.body.xpDesc;
      expense.category = req.body.xpCtgry;
      return expense.save();
    })
    .then((expense) => {
      console.log("expense updated..!!");
      res.status(200).json(expense); // we can send status as well as the json data also to the client side
      // res.redirect("/expenses")
    })
    .catch((err) => {
      console.log(err);
    });
};
