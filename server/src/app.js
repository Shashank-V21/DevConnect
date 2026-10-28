const express = require("express");
const projectRoutes = require("./routes/projectRoutes");

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

// Project endpoints.
app.use("/api/projects", projectRoutes);

module.exports = app;
