const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from server/.env.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Create a pool of reusable database connections.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Log unexpected errors from idle connections.
pool.on('error', function (error) {
  console.error('Unexpected PostgreSQL pool error:', error.message);
});

module.exports = pool;