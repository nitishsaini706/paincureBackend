// app.js
const {Client,Pool} = require('pg');
require('dotenv').config();


const client = new Client({
  connectionString:process.env.DB_URL
});
const pool = new Pool({
  connectionString:process.env.DB_URL
});
// const client = new Client({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
// });

module.exports={client,pool};