const express = require("express");
const router = express.Router();

const premiumController = require('../controllers/premium')

const authMiddleware = require("../middlewares/auth");

router.get("/leaderBoard",authMiddleware.userAuthentication,premiumController.getAllExpenseForLeaderBoard);

module.exports = router;