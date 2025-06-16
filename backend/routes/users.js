// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Your Mongoose model

// GET all users
router.get("/", async (req, res) => {
  try {
    // <-- This is where you put the Mongoose query
    const users = await User.find(); // Fetch all user documents from MongoDB
    
    res.status(200).json(users); // Send users back as JSON response
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

module.exports = router;
