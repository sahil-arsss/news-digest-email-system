const Article = require("../User/models/Article");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY, // Gemini API key
});

const analyzeSentimentText = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Classify sentiment of this news strictly as positive, neutral, or negative:\n${text}`,
      config: {
        systemInstruction:
          "You classify news sentiment strictly as positive, neutral, or negative.",
      },
    });

    return response.text.trim().toLowerCase();
  } catch (error) {
    console.error("Sentiment analysis failed:", error.message);
    return "neutral";
  }
};

const analyzeSentiments = async (limit = 5) => {
  const articles = await Article.find({
    isSummarized: true,
    isSentimentAnalyzed: false,
  }).limit(limit);

  for (const article of articles) {
    const text = `${article.title}. ${article.summary}`;
    const sentiment = await analyzeSentimentText(text);
    console.log(sentiment);
    if (["positive", "neutral", "negative"].includes(sentiment)) {
      article.sentiment = sentiment;
      article.isSentimentAnalyzed = true;
      await article.save();
    }
  }

  return articles.length;
};

module.exports = { analyzeSentiments };
