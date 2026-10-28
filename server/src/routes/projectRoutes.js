const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// GET /api/projects - Retrieve all projects.
router.get("/", async function (req, res, next) {
  try {
    const result = await pool.query(
      "SELECT id, name, description, status, created_at FROM projects ORDER BY created_at DESC",
    );

    res.status(200).json({
      count: result.rows.length,
      projects: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/projects - Create a new project.
router.post("/", async function (req, res, next) {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

    const description =
      typeof req.body.description === "string"
        ? req.body.description.trim()
        : null;

    if (!name) {
      return res.status(400).json({
        error: "Project name is required.",
      });
    }

    if (name.length > 100) {
      return res.status(400).json({
        error: "Project name must be 100 characters or fewer.",
      });
    }

    const result = await pool.query(
      `INSERT INTO projects (name, description)
       VALUES ($1, $2)
       RETURNING id, name, description, status, created_at`,
      [name, description],
    );

    return res.status(201).json({
      project: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id - Update an existing project.
router.put("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    const description =
      typeof req.body?.description === "string"
        ? req.body.description.trim()
        : null;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        error: "Project ID must be a positive integer.",
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "Project name is required.",
      });
    }

    if (name.length > 100) {
      return res.status(400).json({
        error: "Project name must be 100 characters or fewer.",
      });
    }

    const result = await pool.query(
      `UPDATE projects
       SET name = $1, description = $2
       WHERE id = $3
       RETURNING id, name, description, status, created_at`,
      [name, description, Number(id)],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Project not found.",
      });
    }

    return res.status(200).json({
      project: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
