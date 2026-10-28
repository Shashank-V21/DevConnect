
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from server/.env.
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

// Validate required environment variables.
const requiredVariables = [
  'DB_HOST',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
];

const missingVariables = requiredVariables.filter(function (name) {
  return !process.env[name] || !process.env[name].trim();
});

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required database environment variables: ${missingVariables.join(', ')}`
  );
}

// Validate the PostgreSQL port.
const port = Number(process.env.DB_PORT);

if (
  !process.env.DB_PORT ||
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535
) {
  throw new Error('DB_PORT must be an integer between 1 and 65535.');
}

// Create a pool of reusable database connections.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: port,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Log unexpected errors from idle connections.
pool.on('error', function (error) {
  console.error('Unexpected PostgreSQL pool error:', error.message);
});

module.exports = pool;
