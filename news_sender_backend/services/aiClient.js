const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY, // Gemini API key
});
 
const summarizeText = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize this news headline in 2 lines:\n${text}`,
      config: {
        systemInstruction: "You summarize news articles briefly.",
      },
    });
    console.log(response.text.trim())
    return response.text.trim();
  } catch (error) {
    console.error("AI summarization failed:", error.message);
    return "";
  }
};

module.exports = { summarizeText };
