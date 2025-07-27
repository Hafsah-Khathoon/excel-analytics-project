const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  columns: [{
    name: String,
    type: String,
    sampleData: [String]
  }],
  rowCount: {
    type: Number,
    default: 0
  },
  sheetNames: [String],
  isProcessed: {
    type: Boolean,
    default: false
  },
  processingError: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Upload', uploadSchema); 