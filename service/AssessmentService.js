
const {pool} = require('../db/connection')

async function createAssessmentForm(userData) {
  const { email, name, age, gender ,companyName, designation, sitTime, exerciseTime, physicalActivity, sleepTime, medicalCondition,
          medications, surgeries, servicesInterest, goals } = userData;

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    const query = 'INSERT INTO assessments(email, full_name, age, gender, company_name, designation, sit_time, exercise_time, physical_activity,' +
    'sleep_time, medical_condition, medications, surgeries, services_interest, goals) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id';
    const values = [email, name, age, gender ,companyName, designation, sitTime, exerciseTime, physicalActivity, sleepTime, medicalCondition,
                    medications, surgeries, servicesInterest, goals];

    const { rows } = await client.query(query, values);
    const data = rows[0];

    client.release();
    console.log('Connection released');

    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = { 
    createAssessmentForm
}