const path = require("path");
const rootDir = require("../util/path");
const sequelize = require("../util/database");

const expenseModel = require("../models/expense");
const userModel = require("../models/user");

exports.getExpensePage = (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views/expense.html"));
};

exports.postAddExpense = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();

    const logedInUser = req.user;
    console.log("logedInUser", logedInUser);

    const updatedTotalExpense =
      logedInUser.totalExpense + Number(req.body.xpAmount);

    const expense = await expenseModel.create(
      {
        amount: req.body.xpAmount,
        description: req.body.xpDesc,
        category: req.body.xpCtgry,
        UserId: logedInUser.id,
      },
      { transaction: transaction },
    );

    await userModel.update(
      { totalExpense: updatedTotalExpense },
      { where: { id: logedInUser.id }, transaction: transaction },
    );

    await transaction.commit();
    res.status(201).json(expense);
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

exports.getLoggedInUserExpenses = async (req, res, next) => {
  try {
    const logedInUserId = req.user.id;
    console.log("logedInUserId", logedInUserId);

    const expenses = await expenseModel.findAll({
      where: { UserId: logedInUserId },
    });

    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Failed to fetch all expenses" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();

    const logedInUser = req.user;
    const expenseId = req.params.id;
    // console.log("logedInUser", logedInUser);

    let updatedTotalExpense = logedInUser.totalExpense;

    const expense = await expenseModel.findOne({
      where: { id: expenseId, UserId: logedInUser.id },
      transaction: transaction,
    });

    updatedTotalExpense -= Number(expense.amount);

    await expense.destroy({ transaction: transaction });

    await userModel.update(
      { totalExpense: updatedTotalExpense },
      { where: { id: logedInUser.id }, transaction: transaction },
    );

    await transaction.commit();
    res.status(200).json({ message: "expense deleted successfully...!!" });
  } catch (err) {
    await transaction.rollback();
    console.log(err);

    res.status(500).json({ message: "expense failed to delete" });
  }
};

exports.getEditExpense = async (req, res, next) => {
  try {
    const logedInUserId = req.user.id;
    const expenseId = req.params.id;
    // console.log("logedInUserId", logedInUserId)

    const expense = await expenseModel.findOne({
      where: { id: expenseId, UserId: logedInUserId },
    });

    res.status(200).json(expense);
  } catch (err) {
    console.log(err);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const transaction = await sequelize.transaction();

    // console.log("update details", req.body);
    const expenseId = req.body.xpId;
    const logedInUser = req.user;

    let updatedTotalExpense = logedInUser.totalExpense;

    const expense = await expenseModel.findOne({
      where: { id: expenseId, UserId: logedInUser.id },transaction:transaction,
    });

    updatedTotalExpense -= Number(expense.amount);

    expense.amount = req.body.xpAmount;
    expense.description = req.body.xpDesc;
    expense.category = req.body.xpCtgry;

    const updatedExpense = await expense.save({transaction:transaction});

    updatedTotalExpense += Number(updatedExpense.amount);

    await userModel.update(
      { totalExpense: updatedTotalExpense },
      { where: { id: logedInUser.id },transaction:transaction },
    );

    await transaction.commit();
    res.status(200).json(updatedExpense);

  } catch (err) {
    await transaction.rollback();
    console.log(err);
  }
};
