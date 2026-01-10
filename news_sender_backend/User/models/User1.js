const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    topics: {
      type: [String],
      required: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    unsubscribeToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
