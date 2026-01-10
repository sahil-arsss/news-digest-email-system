const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    topic: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
    summary: {
      type: String,
      default: "",
    },
    isSummarized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
articleSchema.index({ topic: 1, createdAt: -1 });
module.exports = mongoose.model("Article", articleSchema);
