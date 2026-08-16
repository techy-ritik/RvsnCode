const express= require('express');
const router = express.Router();

const commentController = require('../controllers/comments')

router.post("/add-comment", commentController.postComment);

router.get('/comments/:postId',commentController.getComments);

module.exports = router;