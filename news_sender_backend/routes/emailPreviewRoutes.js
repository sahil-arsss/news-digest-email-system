const express = require("express");
const router = express.Router();
const Article = require("../User/models/Article");
const groupByTopic = require("../utils/groupByTopic");
const { generateEmailTemplate } = require("../services/emailTemplateService");

router.get("/email-preview", async (req, res) => {
  try {
    const articles = await Article.find({
      isSummarized: true,
      isSentimentAnalyzed: true
    }).limit(10);

    const groupedArticles = groupByTopic(articles);
    const html = generateEmailTemplate({
      userEmail: "test@gmail.com",
      groupedArticles
    });

    res.send(html);
  } catch (error) {
    res.status(500).send("Failed to generate email preview");
  }
});

module.exports = router;
