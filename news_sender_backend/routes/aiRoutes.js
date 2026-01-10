const express = require("express");
const router = express.Router();
const { summarizeArticles } = require("../services/summarizationService");

router.get("/summarize", async (req, res) => {
  try {
    const count = await summarizeArticles(5);

    res.json({
      message: "Summarization completed",
      articlesProcessed: count
    });
  } catch (error) {
    res.status(500).json({
      message: "Summarization failed",
      error: error.message
    });
  }
});

module.exports = router;
