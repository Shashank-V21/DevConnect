const test = require("node:test");
const assert = require("node:assert/strict");
const pool = require("../src/config/db");
const { spawnSync } = require("node:child_process");

test("connects to the DevConnect PostgreSQL database", async function () {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database_name",
    );

    assert.equal(result.rows[0].database_name, "devconnect_dev");
  } finally {
    await pool.end();
  }
});

test("fails when a required database environment variable is missing", function () {
  const result = spawnSync(
    process.execPath,
    ["-e", "require('./src/config/db')"],
    {
      cwd: require("node:path").resolve(__dirname, ".."),
      encoding: "utf8",
      env: {
        ...process.env,
        DB_HOST: "localhost",
        DB_PORT: "5432",
        DB_NAME: "devconnect_test",
        DB_USER: "postgres",
        DB_PASSWORD: "",
      },
    },
  );

  assert.notEqual(result.status, 0);

  assert.match(
    result.stderr,
    /Missing required database environment variables: DB_PASSWORD/,
  );
});

test("fails when the database port is invalid", function () {
  const result = spawnSync(
    process.execPath,
    ["-e", "require('./src/config/db')"],
    {
      cwd: require("node:path").resolve(__dirname, ".."),
      encoding: "utf8",
      env: {
        ...process.env,
        DB_HOST: "localhost",
        DB_PORT: "70000",
        DB_NAME: "devconnect_test",
        DB_USER: "postgres",
        DB_PASSWORD: "test_password",
      },
    },
  );

  assert.notEqual(result.status, 0);

  assert.match(result.stderr, /DB_PORT must be an integer between 1 and 65535/);
});
