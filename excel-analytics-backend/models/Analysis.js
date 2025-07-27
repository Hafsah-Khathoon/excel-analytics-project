const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
    required: true
  },
  chartType: {
    type: String,
    enum: ['bar', 'line', 'scatter', 'pie', 'doughnut', 'area', '3d-scatter', '3d-surface'],
    required: true
  },
  chartTitle: {
    type: String,
    required: true
  },
  xAxis: {
    column: String,
    label: String,
    type: String
  },
  yAxis: {
    column: String,
    label: String,
    type: String
  },
  zAxis: {
    column: String,
    label: String,
    type: String
  },
  chartConfig: {
    backgroundColor: String,
    borderColor: String,
    borderWidth: Number,
    fill: Boolean,
    tension: Number
  },
  dataPoints: Number,
  chartImagePath: String,
  chartData: mongoose.Schema.Types.Mixed,
  is3D: {
    type: Boolean,
    default: false
  },
  analysisDate: {
    type: Date,
    default: Date.now
  },
  downloadCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Analysis', analysisSchema); 