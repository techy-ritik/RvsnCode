const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/',adminController.getIndexPage);

router.post("/create-table",adminController.postCreateTable);

router.get('/get-tables',adminController.getTables);

router.delete("/delete-table/:currentTable",adminController.deleteTable);

module.exports = router;