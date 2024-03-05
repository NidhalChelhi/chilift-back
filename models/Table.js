const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: String,
  lastHeight: Number,
});

module.exports = mongoose.model("Table", tableSchema);
