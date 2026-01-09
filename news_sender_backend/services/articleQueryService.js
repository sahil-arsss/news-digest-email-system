const Article = require("../User/models/Article");

const getArticles = async ({ topic, limit = 10 }) => {
  const filter = {};

  if (topic) {
    filter.topic = topic;
  }

  return await Article.find(filter)
    .sort({ createdAt: -1 }) // latest first
    .limit(limit)
    .select("-__v"); // hide internal field
};

module.exports = { getArticles };
