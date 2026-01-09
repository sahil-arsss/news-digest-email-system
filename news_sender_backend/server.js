const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");
const articleRoutes = require("./routes/articleRoutes");
dotenv.config();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
