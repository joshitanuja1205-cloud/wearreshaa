const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Request logging
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// ================= HEALTH CHECK =================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "RESHAA backend is running",
  });
});

// ================= ROOT =================

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to RESHAA API",
  });
});

module.exports = app;
xx
