const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/',adminController.getIndexPage);

router.post("/create-table",adminController.postCreateTable);

module.exports = router;