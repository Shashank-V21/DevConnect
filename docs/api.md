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
