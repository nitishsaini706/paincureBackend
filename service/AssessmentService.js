
const {pool} = require('../db/connection')

async function createAssessmentForm(userData) {
  

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    // const query = 'INSERT INTO assessments(email, full_name, age, gender, company_name, designation, sit_time, exercise_time, physical_activity,' +
    // 'sleep_time, medical_condition, medications, surgeries, services_interest, goals) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id';
    const query = 'INSERT INTO assessments(services_interest) VALUES ($1) RETURNING id';
    const values = [userData];

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