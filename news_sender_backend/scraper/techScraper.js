const axios = require("axios");
const cheerio = require("cheerio");

const scrapeTechNews = async () => {
  try {
    const { data } = await axios.get("https://techcrunch.com", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120"
      }
    });

    const $ = cheerio.load(data);
    const articles = [];

    
    $("li.wp-block-post").each((i, el) => {
      if (i >= 10) return false;

    
      const title = $(el)
        .find("h3.loop-card__title a")
        .text()
        .trim();

     
      const link = $(el)
        .find("h3.loop-card__title a")
        .attr("href");

      if (title && link) {
        articles.push({
          title,
          link,
          topic: "tech",
          source: "TechCrunch",
          scrapedAt: new Date()
        });
      }
    });

    return articles;
  } catch (error) {
    console.error("Tech scraper error:", error.message);
    return [];
  }
};

module.exports = scrapeTechNews;
