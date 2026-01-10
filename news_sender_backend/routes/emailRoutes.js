const express = require("express");
const router = express.Router();
const { sendDigestToAllUsers } = require("../services/emailService");

router.get("/send-digest", async (req, res) => {
  try {
    const count = await sendDigestToAllUsers();

    res.json({
      message: "Digest emails sent successfully",
      usersNotified: count
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send digest emails",
      error: error.message
    });
  }
});

module.exports = router;
