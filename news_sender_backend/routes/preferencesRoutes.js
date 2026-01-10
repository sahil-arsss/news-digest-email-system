const express = require("express");
const router = express.Router();
const User = require("../User/models/User1");

// PATCH /api/preferences
router.patch("/preferences", async (req, res) => {
  try {
    const { email, topics, frequency } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (topics) user.topics = topics;
    if (frequency) user.frequency = frequency;

    user.isSubscribed = true; // re-activate if updated
    await user.save();

    res.json({
      message: "Preferences updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update preferences"
    });
  }
});

module.exports = router;
