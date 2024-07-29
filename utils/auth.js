const jwt = require('jsonwebtoken');
const { pool } = require('../db/connection')

// Middleware to authenticate JWT token
const auth = async (req, res, next) => {

  try {
    const client = await pool.connect();

    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let query = `select email, password ,id from users where email = '${decoded.email}'`
    const {rows} = await client.query(query);
    client.release();
    if (!rows[0]) {
      throw new Error();
    }
    req.user = rows[0];
    next();
  } catch (error) {
    console.log('error in auth middleware', error)
    res.status(401).json({ message: 'Authentication failed.' });
  }
};

module.exports = auth;
