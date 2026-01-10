const groupByTopic = (articles) => {
  return articles.reduce((acc, article) => {
    if (!acc[article.topic]) {
      acc[article.topic] = [];
    }
    acc[article.topic].push(article);
    return acc;
  }, {});
};

module.exports = groupByTopic;
