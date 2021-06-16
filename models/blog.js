const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Excerpt: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Tag: {
    type: String,
    required: true,
  },
  Image: {
    Content: { type: String },
    Orientation: { type: String },
  },
  Views: {
    type: Number,
    required: false,
  },
  Likes: {
    type: Number,
    required: false,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
