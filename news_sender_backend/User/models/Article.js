const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      required: true,
      unique: true
    },
    topic: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    scrapedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);
articleSchema.index({ topic: 1, createdAt: -1 });
module.exports = mongoose.model("Article", articleSchema);
