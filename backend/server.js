require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Database Connection
require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.status(200).send("Billing System API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});