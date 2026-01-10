const sentimentMap = {
  positive: "🟢 Positive",
  neutral: "🟡 Neutral",
  negative: "🔴 Negative",
};

const generateArticleHTML = (article) => {
  return `
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0;">
        <a href="${
          article.link
        }" target="_blank" style="color: #1a73e8; text-decoration: none;">
          ${article.title}
        </a>
      </h4>
      <p style="margin: 6px 0; color: #444;">
        ${article.summary || "Summary not available"}
      </p>
      <small style="color: #666;">
        Sentiment: ${sentimentMap[article.sentiment] || "🟡 Neutral"}
      </small>
    </div>
  `;
};

const generateTopicSection = (topic, articles) => {
  if (!articles.length) return "";

  return `
    <hr />
    <h2 style="color: #222; text-transform: capitalize;">
      ${topic} News
    </h2>
    ${articles.map(generateArticleHTML).join("")}
  `;
};

const generateEmailTemplate = ({ userEmail, groupedArticles,unsubscribeToken  }) => {
  const topicSections = Object.keys(groupedArticles)
    .map((topic) => generateTopicSection(topic, groupedArticles[topic]))
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h1 style="text-align: center;">📰 Your News Digest</h1>
      
      <p>Hello,</p>
      <p>
        Here is your personalized news digest based on your selected interests.
      </p>

      ${topicSections}

      <hr />
      <p style="font-size: 12px; color: #777;">
        You are receiving this email because you subscribed to the News Digest system.
      </p>
      <p style="font-size: 12px; color: #777;">
             <a href="http://localhost:5000/api/unsubscribe/${unsubscribeToken}">
       Unsubscribe
    </a>
  </p>

    </div>
  `;
};

module.exports = { generateEmailTemplate };
