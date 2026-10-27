const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

test("GET /api/health returns a successful health check", async function () {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);

  assert.deepEqual(response.body, {
    status: "ok",
    message: "DevConnect API is running",
  });
});
