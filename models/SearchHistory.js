const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  searchDate: {
    type: Date,
    default: Date.now
  },
  resultFound: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
