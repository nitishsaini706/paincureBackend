const express = require('express');
const router = express.Router();
const assessmentController = require('../controller/assessmentController');
const auth = require('../utils/auth');

router.post('/' ,assessmentController.createAssessmentForm);
router.get('/' ,auth,assessmentController.getFormData);

module.exports = router;
