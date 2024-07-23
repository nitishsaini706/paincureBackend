const pg = require('pg');
const { Pool, Client } = pg
require('dotenv').config()
const DB_URL = process.env.DB_URL
console.log( DB_URL)
const pool = new Pool({
  connectionString: DB_URL
});
 
const client = new Client({
  connectionString: DB_URL
});

module.exports = {client,pool}
