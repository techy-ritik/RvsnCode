const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense");

const authMiddleware = require("../middlewares/auth");

router.get("/expense-page", expenseController.getExpensePage);

router.post("/add-expense",authMiddleware.userAuthentication,expenseController.postAddExpense);

router.get("/expenses",authMiddleware.userAuthentication,expenseController.getExpenses);

router.delete("/delete-expense/:id",authMiddleware.userAuthentication, expenseController.deleteExpense);

router.get("/edit-expense/:id",authMiddleware.userAuthentication,expenseController.getEditExpense);

router.put("/update-expense",authMiddleware.userAuthentication, expenseController.updateExpense);

module.exports = router;
