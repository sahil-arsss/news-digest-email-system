const Article = require("../User/models/Article");
const { summarizeText } = require("./aiClient");

const summarizeArticles = async (limit = 5) => {
  const articles = await Article.find({ isSummarized: false }).limit(limit);

  for (const article of articles) {
    const summary = await summarizeText(article.title);

    if (summary) {
      article.summary = summary;
      article.isSummarized = true;
      await article.save();
    }
  }

  return articles.length;
};  

module.exports = { summarizeArticles };
