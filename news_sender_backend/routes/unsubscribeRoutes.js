const express = require("express");
const router = express.Router();
const User = require("../User/models/User1");

// GET /api/unsubscribe/:token
router.get("/unsubscribe/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      unsubscribeToken: req.params.token
    });

    if (!user) {
      return res.status(404).send("Invalid unsubscribe link");
    }

    user.isSubscribed = false;
    await user.save();

    res.send("You have been unsubscribed successfully.");
  } catch (error) {
    res.status(500).send("Unsubscribe failed");
  }
});

module.exports = router;
