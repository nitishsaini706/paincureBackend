const bcrypt = require('bcryptjs');
const {pool} = require('../db/connection')

async function createAvailService(userData,data) {
  const { userId } = userData;
  
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    const query = 'INSERT INTO program (user_id) VALUES ($1) RETURNING id';
    const values = [userId];

    const { rows } = await client.query(query, values);
    const createdUser = rows;

    client.release();
    console.log('Connection released');

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function findAvail(userData) {
  const { userId } = userData;
  try {
    const client = await pool.connect();
    // Use parameterized query to prevent SQL injection
    const query = 'SELECT id FROM program WHERE user_id=$1';
    const values = [userId];

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
    const query = 'SELECT email, password,name,id,image,bio FROM program WHERE id = $1';
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
        const query = `Update program
        set monday=$1,tuesday=$2,wednesday=$3,thursday=$4,friday=$5,saturday=$6,sunday=$7
        where id=$8
        `;
        const values = [userData.monday,userData.tuesday,userData.wednesday,userData.thursday,userData.friday,userData.saturday,userData.sunday,id];
    
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
        const query = `Update program
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

async function getAvailByUser(user) {
    try {
        const client = await pool.connect();
        // Use parameterized query to prevent SQL injection
        const query = 'SELECT id,monday,tuesday,wednesday,thursday,friday,saturday,sunday FROM program WHERE users=$1';
        const values = [user];       
    
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
  createAvailService,
  updateUser,
  deleteUser,
  getAvailByUser,
  getById,
  findAvail,
  comparePassword,
  getUser
};
