const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");
const articleRoutes = require("./routes/articleRoutes");
const aiRoutes = require("./routes/aiRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
const emailPreviewRoutes = require("./routes/emailPreviewRoutes");
const emailRoutes = require("./routes/emailRoutes");
const startDailyJob = require("./cron/dailyJob");
const startWeeklyJob = require("./cron/weeklyJob");

const app = express();

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("News Digest Backend is Running 🚀");
});


app.use("/api/users", userRoutes);
app.use("/api", scrapeRoutes);
app.use("/api", articleRoutes);
app.use("/api", aiRoutes);
app.use("/api", sentimentRoutes);  
app.use("/api", emailPreviewRoutes);
app.use("/api", emailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startDailyJob();
startWeeklyJob();