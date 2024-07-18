const pg = require('pg');
const { Pool, Client } = pg
 
const pool = new Pool({
  user: 'postgres',
  password: 'aryan',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});
 
const client = new Client({
  user: 'postgres',
  password: 'aryan',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

module.exports = {client,pool}
