const express = require('express');
const router = express.Router();
const assessmentController = require('../controller/assessmentController');

router.post('/' ,assessmentController.createAssessmentForm);

module.exports = router;
