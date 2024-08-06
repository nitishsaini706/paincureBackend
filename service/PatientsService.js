const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {pool} = require('../db/connection')

async function createUser(userData) {
  const { email, name, phone, password } = userData;

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO patients (email, name, phone, password) VALUES ($1, $2, $3, $4) RETURNING id';
    const values = [email, name, phone, hashedPassword];

    const { rows } = await client.query(query, values);
    const createdUser = rows[0];

    client.release();
    console.log('Connection released');

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function findUser(userData) {
  const { name, phone, email, password } = userData;
  try {
    const client = await pool.connect();
    // Use parameterized query to prevent SQL injection
    const query = 'SELECT id,email, password,name,id,image FROM patients WHERE email = $1 OR phone=$2';
    const values = [email,phone];

    const res = await client.query(query, values);
    client.release();
    return res.rows.length ? res.rows[0] : {}; // Return the user found
  } catch (error) {
    console.error('Error in finding user:', error);
    throw error; // Rethrow the error for further handling
  } 
}
async function getUser(id) {
  try {
    const client = await pool.connect();
    // Use parameterized query to prevent SQL injection
    const query = 'SELECT email, password,name,id,image,bio FROM patients WHERE id = $1';
    const values = [id];

    const res = await client.query(query, values);
    client.release();
    return res.rows.length ? res.rows[0] : {}; // Return the user found
  } catch (error) {
    console.error('Error in finding user:', error);
    throw error; // Rethrow the error for further handling
  } 
}

async function updateUser(id,userData) {
    try {
        const client = await pool.connect();
        // Use parameterized query to prevent SQL injection
        const query = `Update patients
        set name=$1,phone=$2,image=$3
        where id=$4
        `;
        const values = [userData.name,userData.phone,userData.image,id];
    
        const res = await client.query(query, values);
        client.release();
        return res.rows.length ? res.rows : []; // Return the user found
      } catch (error) {
        console.error('Error in finding user:', error);
        throw error; // Rethrow the error for further handling
      } 
}

async function deleteUser(id) {
    try {
        const client = await pool.connect();
        // Use parameterized query to prevent SQL injection
        const query = `Update patients
        set isdeleted=true
        where id=$1
        `;
        const values = [id];
    
        const res = await client.query(query, values);
        client.release();
        return res.rows.length ? res.rows : []; // Return the user found
      } catch (error) {
        console.error('Error in deleting id:', error);
        throw error; // Rethrow the error for further handling
      } 
}

async function getpatientsforDoc(user,program) {
    try {
        const client = await pool.connect();
        // Use parameterized query to prevent SQL injection
        const query = 'SELECT id,email,name,image,phon FROM patients WHERE users=$1';
        const values = [user];
        if(program != ""){
            query+=' OR program=$2'
        }
    
        const res = await client.query(query, values);
        client.release();
        return res.rows.length ? res.rows : []; // Return the user found
      } catch (error) {
        console.error('Error in finding user:', error);
        throw error; // Rethrow the error for further handling
      } 
}

async function getById(name) {
  return await User.find({ name: { $regex: name, $options: 'i' } });
}


async function comparePassword(password, candidatePassword) {
  return await bcrypt.compare(candidatePassword, password);
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getpatientsforDoc,
  getById,
  findUser,
  comparePassword,
  getUser
};
