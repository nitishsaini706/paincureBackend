const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserService = require('../service/UserService');
require('dotenv').config()

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Check if user already exists
    let existingUser = await UserService.findUser(req.body);
    if (Object.keys(existingUser).length > 0) {
      return res.status(400).json({ message: 'User already exists with that mobile number or email.' });
    }
    // Create new user
    const user = await UserService.createUser(req.body);
    if(user){

      return res.status(200).json({ message: 'User created successfully.' });
    }
    
    return res.status(401).json({ message: 'User created failed.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Find user by mobile number
  let {password} = req.body
    let user = await UserService.findUser(req.body);
    console.log('user', user)
    if (Object.keys(user).length == 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Check password
    const isMatch = await UserService.comparePassword(user.password,password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id ,email:user.email,name:user.name}, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token:token,message:"Login successful" ,user:user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
