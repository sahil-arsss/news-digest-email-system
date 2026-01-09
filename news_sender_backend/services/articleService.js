const Article = require("../User/models/Article");

const saveArticles = async (articles) => {
  for (const article of articles) {
    try {
      await Article.create(article);
    } catch (error) {
      // Duplicate article (link already exists)
      if (error.code !== 11000) {
        console.error("Article save error:", error.message);
      }
    }
  }
};

module.exports = saveArticles;
