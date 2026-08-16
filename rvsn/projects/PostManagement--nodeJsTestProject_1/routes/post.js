const express = require('express');

const router = express.Router();

const postController = require('../controllers/post')

router.get("/", postController.getIndex);

router.post("/add-post",postController.addPost);

router.get("/get-posts",postController.getPosts);

module.exports = router;