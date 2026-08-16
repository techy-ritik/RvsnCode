const express = require('express');

const router = express.Router();

const dbRecordController = require('../controllers/dbRecords');

router.get("/table-records/:table", dbRecordController.getTableRecords);

router.post("/insert-record",dbRecordController.postTableRecords);

router.delete("/delete-record/:id/:currentTable",dbRecordController.deleteRecord);

module.exports = router;