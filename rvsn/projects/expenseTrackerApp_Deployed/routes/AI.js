const express = require('express');
const router = express.Router();

const aiController = require('../controllers/AI');

router.post('/category-suggestion',aiController.describedCategorySuggestion);

module.exports = router;