const scrapeTechNews = require("./techScraper");

const runScrapers = async () => {
  const techArticles = await scrapeTechNews();
  return [...techArticles];
};

module.exports = runScrapers;
