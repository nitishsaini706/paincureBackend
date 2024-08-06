const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {pool} = require('../db/connection')

async function createUser(userData) {
  const { email, name, phone, password } = userData;

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (email, name, phone, password) VALUES ($1, $2, $3, $4) RETURNING id';
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
    const query = 'SELECT email, password,name,id,image FROM users WHERE email = $1 OR phone=$2';
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
    const query = `SELECT us.email,us.name,us.id,us.image,us.bio,us.degree,us.phone,us.role,
    av.monday,av.tuesday,av.wednesday,av.thursday,av.friday,av.saturday,av.sunday=$7
    LEFT JOIN availability as av on av.id = us.avail_id
    FROM users us WHERE id = $1`;
    const values = [id];

    const res = await client.query(query, values);
    client.release();
    return res.rows.length ? res.rows : []; // Return the user found
  } catch (error) {
    console.error('Error in finding user:', error);
    throw error; // Rethrow the error for further handling
  } 
}

async function updateUser(user, userData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let query = `
      UPDATE users
      SET name = $1, phone = $2, image = $3
      WHERE id = $4
    `;
    let values = [userData.name, userData.phone, userData.image, user.id];

    await client.query(query, values);

    query = `
      UPDATE availability
      SET monday = $1, tuesday = $2, wednesday = $3, thursday = $4, 
          friday = $5, saturday = $6, sunday = $7
      WHERE id = $8
    `;
    values = [
      userData.monday,
      userData.tuesday,
      userData.wednesday,
      userData.thursday,
      userData.friday,
      userData.saturday,
      userData.sunday,
      user.avail_id,
    ];

    await client.query(query, values);

    await client.query('COMMIT');

    return [{ success: true }]; 
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error('Error in updating user:', error);
    throw error; // Rethrow the error for further handling
  } finally {
    client.release(); // Ensure the client is released
  }
}


async function deleteUser(id) {
  try {
    const client = await pool.connect();
    // Use parameterized query to prevent SQL injection
    const query = `Update users
    set isdeleted=true
    where id=$1
    `;
    const values = [id];

    const res = await client.query(query, values);
    client.release();
    return res.rows.length ? res.rows[0] : []; // Return the user found
  } catch (error) {
    console.error('Error in deleeting user:', error);
    throw error; // Rethrow the error for further handling
  } }

async function getUsers() {
  return await User.find();
}

async function searchUsersByName(name) {
  return await User.find({ name: { $regex: name, $options: 'i' } });
}

async function whatsappInfo(body) {
  try {
    const {name,phone,service} = body;

    const client = await pool.connect();
    let query = `
    INSERT INTO leads
    (version, name,phone,service)
    VALUES(1,'${name}','${phone}','${service}')
    returning id
    `;
    console.log('query', query)
    const {rows} = await client.query(query);
    console.log('rows', rows)
    client.release();
    if(rows){
      return rows
    }
    return [];
  }catch(e){
    console.log("error in creating blog",e);
    return [];
  }
};
async function comparePassword(password, candidatePassword) {
  return await bcrypt.compare(candidatePassword, password);
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  searchUsersByName,
  findUser,
  comparePassword,
  whatsappInfo,
  getUser
};
