const AssessmentService = require('../service/AssessmentService');

const createAssessmentForm = async(req, res)=> {
    try {
      const data = await AssessmentService.createAssessmentForm(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
const getFormData = async(req, res)=> {
    try {
      const data = await AssessmentService.getFormData();
      const finalData = [];
      // console.log('data', data)
      for(let item of data){
        // console.log('first', item.services_interest)
        const cleanedString = item.services_interest.slice(1, -1);
        // console.log('cleaned', cleanedString)
        const jsonStrings = cleanedString.split('","');
        console.log('jsonStrings', jsonStrings)
        
        const resultArray = jsonStrings.map((jsonString,index) => {
          // Remove the extra escape characters
          let formattedString = jsonString.replace(/\\"/g, '"');
          // Parse the JSON string
          try {
            if(index == 0){

              formattedString=formattedString.replace(/"{/, '{');
            }
            if(index == jsonStrings.length-1 ){
              formattedString=formattedString.replace(/"$/, '');
            }
            console.log('first', formattedString)
            return JSON.parse(formattedString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null; // Return null or handle the error as needed
          }
        }).filter(item => item !== null); 
        // console.log('resultArray', resultArray)
        finalData.push(resultArray);
      }


      res.status(201).json({msg:"success",data:finalData});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  module.exports = {
    createAssessmentForm,
    getFormData
  }