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

module.exports = router;
