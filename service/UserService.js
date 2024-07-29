const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {client,pool} = require('../db/connection')

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
  const { name, mobileNo, email, password } = userData;
  try {
    const client = await pool.connect();
    // Use parameterized query to prevent SQL injection
    const query = 'SELECT email, password FROM users WHERE email = $1';
    const values = [email];

    const res = await client.query(query, values);
    client.release();
    return res.rows.length ? res.rows[0] : {}; // Return the user found
  } catch (error) {
    console.error('Error in finding user:', error);
    throw error; // Rethrow the error for further handling
  } 
}

async function updateUser(id, userData) {
  return await User.findByIdAndUpdate(
    id, userData, { new: true });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

async function getUsers() {
  return await User.find();
}

async function searchUsersByName(name) {
  return await User.find({ name: { $regex: name, $options: 'i' } });
}
async function followUser(userId, userIdToFollow) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    await user.follow(userIdToFollow);
    return { success: true, message: 'User followed successfully.' };
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error.');
  }
};

// Unfollow a user
async function unfollowUser(userId, userIdToUnfollow) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    await user.unfollow(userIdToUnfollow);
    return { success: true, message: 'User unfollowed successfully.' };
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error.');
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
  unfollowUser,
  followUser,
  findUser,
  comparePassword
};
