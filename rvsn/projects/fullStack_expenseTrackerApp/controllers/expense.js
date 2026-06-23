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
    }) //  here when we recieve data through fontend json object then we have to use those keys name here with req.body which is used in the client side js file while creating the object which is passed with post request
    .then((expense) => {
      console.log("new added expense", expense);
      console.log("expense added!!");
      res.status(200).json(expense);
      // res.redirect('/expensess')  // here when we redirect different routes from server side then it's difficult to maintain the correct flow each time as we have to watch the method also so it's better to handle same functionality from client side by sending json response from here
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
    }) //  here we need not to redirect to "/expenses" as we have already send response one time so furhter execution will be done in client side only
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
  expenseModel
    .findByPk(expenseId)
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
