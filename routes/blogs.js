const express = require('express');
const router = express.Router();
const blogsController = require('../controller/blogsController');
const auth = require("../utils/auth")

// Create a new comment
router.get('/web', blogsController.getBlogWeb);
router.post('/',auth ,blogsController.createComment);
router.put('/:slug',auth, blogsController.updateComment);
router.delete('/:slug',auth, blogsController.deleteComment);
router.get('/',auth, blogsController.getBlogsByUser);
router.get('/:slug', blogsController.getBlogsById);
router.post('/title',auth, blogsController.getBlogByTitle);

module.exports = router;
