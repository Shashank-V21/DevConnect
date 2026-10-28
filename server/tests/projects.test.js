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

test("POST /api/projects creates a project", async function () {
  const response = await request(app).post("/api/projects").send({
    name: "Interview Preparation",
    description: "Track software engineering preparation",
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.project.name, "Interview Preparation");
  assert.equal(
    response.body.project.description,
    "Track software engineering preparation",
  );
  assert.ok(response.body.project.id);
});

test("POST /api/projects rejects a missing project name", async function () {
  const response = await request(app).post("/api/projects").send({
    description: "A project without a name",
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Project name is required.");
});

test("POST /api/projects rejects a name longer than 100 characters", async function () {
  const response = await request(app)
    .post("/api/projects")
    .send({
      name: "A".repeat(101),
    });

  assert.equal(response.status, 400);
  assert.equal(
    response.body.error,
    "Project name must be 100 characters or fewer.",
  );
});

test("PUT /api/projects/:id updates an existing project", async function () {
  // Create a project first.
  const created = await request(app).post("/api/projects").send({
    name: "Original Project",
    description: "Original description",
  });

  assert.equal(created.status, 201);

  const projectId = created.body.project.id;

  // Update the project.
  const response = await request(app).put(`/api/projects/${projectId}`).send({
    name: "Updated Project",
    description: "Updated description",
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.project.id, projectId);
  assert.equal(response.body.project.name, "Updated Project");
  assert.equal(response.body.project.description, "Updated description");
});

test("PUT /api/projects/:id returns 400 for an invalid project ID", async function () {
  const response = await request(app).put("/api/projects/abc").send({
    name: "Updated Project",
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Project ID must be a positive integer.");
});

test("PUT /api/projects/:id returns 404 when the project does not exist", async function () {
  const response = await request(app).put("/api/projects/2147483647").send({
    name: "Updated Project",
  });

  assert.equal(response.status, 404);
  assert.equal(response.body.error, "Project not found.");
});
