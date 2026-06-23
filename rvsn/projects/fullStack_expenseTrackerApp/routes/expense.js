const express = require('express');

const router = express.Router();

const expenseController = require("../controllers/expense");

router.get('/',expenseController.getIndexPage);

router.post('/add-expense',expenseController.postAddExpense);

router.get("/expenses",expenseController.getExpenses);

router.delete("/delete-expense/:id",expenseController.deleteExpense);   // as we are receiving dynamic id from the client side so we have to add dynamic params here with route

router.get("/edit-expense/:id",expenseController.getEditExpense);

router.put("/update-expense",expenseController.updateExpense);

module.exports = router;