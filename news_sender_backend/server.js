const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");
const articleRoutes = require("./routes/articleRoutes");
const aiRoutes = require("./routes/aiRoutes");


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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
