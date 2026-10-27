const express = require("express");

const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

// Health-check endpoint.
app.get("/api/health", function (req, res) {
  res.status(200).json({
    status: "ok",
    message: "DevConnect API is running",
  });
});

module.exports = app;
