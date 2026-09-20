const path = require("path");
const rootDir = require("../util/path");

const expenseModel = require("../models/expense");
const userModel = require("../models/user");

exports.getExpensePage = (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views/expense.html"));
};

exports.postAddExpense = (req, res, next) => {
  const logedInUser = req.user;
  console.log("logedInUser", logedInUser);

  const updatedTotalExpense =
    logedInUser.totalExpense + Number(req.body.xpAmount);

  userModel
    .update(
      { totalExpense: updatedTotalExpense },
      { where: { id: logedInUser.id } },
    )
    .then(() => {
      console.log("total expense Updated...")
      return expenseModel.create({
        amount: req.body.xpAmount,
        description: req.body.xpDesc,
        category: req.body.xpCtgry,
        UserId: logedInUser.id,
      });
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

exports.getLoggedInUserExpenses = (req, res, next) => {
  const logedInUserId = req.user.id;
  console.log("logedInUserId", logedInUserId);

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
  const logedInUser = req.user;
  const expenseId = req.params.id;
  // console.log("logedInUser", logedInUser);
  let updatedTotalExpense = logedInUser.totalExpense;
  expenseModel
    .findOne({ where: { id: expenseId, UserId: logedInUser.id } })
    .then((expense) => {
      updatedTotalExpense -= Number(expense.amount);
      return expense.destroy();
    })
    .then(() => {
      console.log("expense deleted");
      return userModel.update(
        { totalExpense: updatedTotalExpense },
        { where: { id: logedInUser.id } },
      );
    })
    .then(() => {
      console.log("Total expense updated...")
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
  const logedInUser = req.user;

  let updatedTotalExpense = logedInUser.totalExpense;

  expenseModel
    .findOne({ where: { id: expenseId, UserId: logedInUser.id } })
    .then((expense) => {

      updatedTotalExpense -= Number(expense.amount);

      expense.amount = req.body.xpAmount;
      expense.description = req.body.xpDesc;
      expense.category = req.body.xpCtgry;
      return expense.save();
    })
    .then((expense) => {
      console.log("expense updated..!!");
      updatedTotalExpense += Number(expense.amount);

      userModel.update(
        { totalExpense: updatedTotalExpense },
        { where: { id: logedInUser.id } },
      )
      .then(()=>{
        console.log("Total expense updated...");

        res.status(200).json(expense);
      }) 
    })
    .catch((err) => {
      console.log(err);
    });
};
