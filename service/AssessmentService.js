
const {pool} = require('../db/connection')

async function createAssessmentForm(userData) {
  

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
     const { fullName, height, weight, email, age, gender, companyName, designation, sittingHours, exercise, exerciseFrequency, activities, medicalConditions, medications, sleepHours,
       surgeries, services, goals } = userData;
    const query = 'INSERT INTO assessments(email, full_name, age, gender, company_name, designation, sit_time, exercise_time, physical_activity,' +
    'sleep_time, medical_condition, medications, surgeries, services_interest, goals, height, weight) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING id';
    // const query = 'INSERT INTO assessments(services_interest) VALUES ($1) RETURNING id';
    const values = [email, fullName, age, gender, companyName, designation, sittingHours, exercise, activities, sleepHours,medicalConditions, medications, surgeries, services, goals, height, weight ];

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
async function getFormData() {
  

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    
    const query = 'SELECT services_interest FROM assessments where isdeleted=false ORDER BY creation_time ';

    const { rows } = await client.query(query);

    client.release();
    console.log('Connection released');

    return rows.length ? rows : [];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = { 
    createAssessmentForm,
    getFormData
}