const test = require('node:test');
const assert = require('node:assert/strict');
const pool = require('../src/config/db');

test('connects to the DevConnect PostgreSQL database', async function () {
  try {
    const result = await pool.query(
      'SELECT current_database() AS database_name'
    );

    assert.equal(result.rows[0].database_name, 'devconnect_dev');
  } finally {
    await pool.end();
  }
});