const express = require('express');

const router = express.Router();

const expenseController = require("../controllers/expense");

router.get('/expense-page',expenseController.getExpensePage);

router.post('/add-expense',expenseController.postAddExpense);

router.get("/expenses",expenseController.getExpenses);

router.delete("/delete-expense/:id",expenseController.deleteExpense);

router.get("/edit-expense/:id",expenseController.getEditExpense);

router.put("/update-expense",expenseController.updateExpense);

module.exports = router;