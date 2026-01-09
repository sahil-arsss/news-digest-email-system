const express = require("express");
const router = express.Router();
const { getArticles } = require("../services/articleQueryService");

// GET /api/articles
// GET /api/articles?topic=tech&limit=5
router.get("/articles", async (req, res) => {
  try {
    const { topic, limit } = req.query;

    const articles = await getArticles({
      topic,
      limit: Number(limit) || 10
    });

    res.json({
      total: articles.length,
      articles
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch articles",
      error: error.message
    });
  }
});

module.exports = router;
