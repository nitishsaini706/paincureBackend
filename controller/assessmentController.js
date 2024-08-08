const AssessmentService = require('../service/AssessmentService');

const createAssessmentForm = async(req, res)=> {
    try {
      const data = await AssessmentService.createAssessmentForm(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  module.exports = {
    createAssessmentForm
  }