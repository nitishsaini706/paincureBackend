const express = require('express');
const router = express.Router();
const blogsController = require('../controller/blogsController');
const auth = require("../utils/auth")

// Create a new comment
router.post('/',auth ,blogsController.createComment);
router.put('/',auth, blogsController.updateComment);
router.delete('/',auth, blogsController.deleteComment);
router.get('/',auth, blogsController.getBlogsByUser);
router.get('/{id}',auth, blogsController.getBlogsById);

module.exports = router;
