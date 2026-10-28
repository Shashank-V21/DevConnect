# DevConnect API Documentation

## Overview

DevConnect provides a REST API for communication between the frontend and backend.

**Base URL (local development):** `http://localhost:3000`

## Health Check

Checks whether the DevConnect API is running.

- **Method:** `GET`
- **Endpoint:** `/api/health`
- **Authentication:** Not required
- **Success status:** `200 OK`

### Example Request

```http
GET /api/health
```

### Example Response

```json
{
  "status": "ok",
  "message": "DevConnect API is running"
}
```

### Automated Test

The health-check endpoint is tested using Node.js's built-in test runner and Supertest.

Run the tests from the `server` directory:

```powershell
npm.cmd test
```

The test verifies the HTTP status code and response body.

## POST /api/projects

Creates a new project.

**Request**

`POST /api/projects`

Content-Type: `application/json`

```json
{
  "name": "Interview Preparation",
  "description": "Track software engineering preparation"
}
```

The `name` field is required, must be a non-empty string after trimming, and cannot exceed 100 characters. The `description` field is optional and may be a string.

**Success response — `201 Created`**

Returns the created project in a `project` object, including its generated ID, name, description, status, and creation timestamp.

**Validation errors — `400 Bad Request`**

Returns an `error` message when the project name is missing, empty, or longer than 100 characters.

**Database errors**

Unexpected database errors are passed to Express error handling.

### PUT /api/projects/:id

Updates an existing project by its ID.

**Request**

`PUT /api/projects/1`

Content-Type: `application/json`

```json
{
  "name": "Updated Project",
  "description": "Updated project description"
}
```

**Validation**

- `id` must be a positive integer.
- `name` is required and must contain 1–100 characters after trimming whitespace.
- `description` is optional. If omitted or not a string, it is stored as `null`.

**Success Response — `200 OK`**

Returns the updated project:

```json
{
  "project": {
    "id": 1,
    "name": "Updated Project",
    "description": "Updated project description",
    "status": "active",
    "created_at": "2026-10-28T10:00:00.000Z"
  }
}
```

The response values are illustrative; the actual values depend on the database.

**Error Responses**

- `400 Bad Request` — invalid project ID or project name.
- `404 Not Found` — no project exists with the specified ID.
