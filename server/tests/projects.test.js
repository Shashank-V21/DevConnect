const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

test("GET /api/projects returns an empty list when no projects exist", async function () {
  const response = await request(app).get("/api/projects");

  assert.equal(response.status, 200);

  assert.equal(typeof response.body.count, "number");
  assert.ok(Array.isArray(response.body.projects));
});
