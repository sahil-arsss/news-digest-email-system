const cron = require("node-cron");
const runScrapers = require("../scraper");
const saveArticles = require("../services/articleService");
const { summarizeArticles } = require("../services/summarizationService");
const { analyzeSentiments } = require("../services/sentimentService");
const { sendDigestToAllUsers } = require("../services/emailService");

const startDailyJob = () => {
  // Scrape at 7:00 AM
  cron.schedule("0 7 * * *", async () => {
    console.log("🔄 Daily Scraping Started");
    const articles = await runScrapers();
    await saveArticles(articles);
  });

  // Summarize at 7:10 AM
  cron.schedule("10 7 * * *", async () => {
    console.log("🤖 AI Summarization Started");
    await summarizeArticles(10);
  });

  // Sentiment at 7:20 AM
  cron.schedule("20 7 * * *", async () => {
    console.log("📊 Sentiment Analysis Started");
    await analyzeSentiments(10);
  });

  // Email at 8:00 AM
  cron.schedule("0 8 * * *", async () => {
    console.log("📧 Sending Daily Emails");
    await sendDigestToAllUsers();
  });
};

module.exports = startDailyJob;
