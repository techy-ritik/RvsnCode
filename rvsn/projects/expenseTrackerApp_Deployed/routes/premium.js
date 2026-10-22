const express = require("express");
const router = express.Router();

const premiumController = require('../controllers/premium')

const authMiddleware = require("../middlewares/auth");

router.get("/leaderBoard",authMiddleware.userAuthentication,premiumController.getAllExpenseForLeaderBoard);

router.get("/report-download",authMiddleware.userAuthentication, premiumController.expenseReportDownload);

router.get("/old-report-download",authMiddleware.userAuthentication, premiumController.oldReportDownload);

module.exports = router;