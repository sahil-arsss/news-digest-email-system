const express = require("express");
const router = express.Router();
const { analyzeSentiments } = require("../services/sentimentService");

router.get("/sentiment", async (req, res) => {
  try {
    const count = await analyzeSentiments(5);

    res.json({
      message: "Sentiment analysis completed",
      articlesProcessed: count
    });
  } catch (error) {
    res.status(500).json({
      message: "Sentiment analysis failed",
      error: error.message
    });
  }
});

module.exports = router;
