const express = require('express');
const router = express.Router();
const blogsController = require('../controller/blogsController');
const auth = require("../utils/auth")

// Create a new comment
router.post('/',auth ,blogsController.createComment);
router.put('/:slug',auth, blogsController.updateComment);
router.delete('/:slug',auth, blogsController.deleteComment);
router.get('/',auth, blogsController.getBlogsByUser);
router.get('/:slug',auth, blogsController.getBlogsById);

module.exports = router;
