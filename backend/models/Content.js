const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Content", ContentSchema);