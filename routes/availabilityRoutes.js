const express = require('express');
const router = express.Router();
const blogsController = require('../controller/availabilityController');
const auth = require("../utils/auth")

// Create a new comment
router.post('/',auth ,blogsController.createAvail);
router.put('/',auth, blogsController.updateComment);
router.delete('/:id',auth, blogsController.deleteComment);
router.get('/',auth, blogsController.getAvailByUser);
router.get('/:id',auth, blogsController.getBlogsById);

module.exports = router;
