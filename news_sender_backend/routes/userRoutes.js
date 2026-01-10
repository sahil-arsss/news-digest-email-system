const express = require("express");
const router = express.Router();
const User = require("../User/models/User1");
const generateToken = require("../utils/generateToken");
// POST /subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email, topics, frequency } = req.body;

    // Basic validation
    if (!email || !topics || !frequency) {
      return res.status(400).json({
        message: "Email, topics, and frequency are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already subscribed"
      });
    }

    // Create user
    const user = await User.create({
      email,
      topics,
      frequency,
      unsubscribeToken: generateToken()
    });

    res.status(201).json({
      message: "Subscription successful",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;
