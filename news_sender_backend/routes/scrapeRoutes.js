const express = require("express");
const router = express.Router();

const runScrapers = require("../scraper");
const saveArticles = require("../services/articleService");

router.get("/scrape", async (req, res) => {
  try {
    const articles = await runScrapers();
    await saveArticles(articles);

    res.json({
      message: "Scraping completed",
      total: articles.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Scraping failed",
      error: error.message
    });
  }
});

module.exports = router;
