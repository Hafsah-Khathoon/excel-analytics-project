const express = require('express');
const { auth } = require('../middleware/auth');
const {
  generateChart,
  getUserAnalyses,
  getAnalysisById,
  exportChartPNG,
  exportChartPDF
} = require('../controllers/chartController');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Routes
router.post('/generate', generateChart);
router.get('/analyses', getUserAnalyses);
router.get('/analyses/:id', getAnalysisById);
router.get('/export/:analysisId/png', exportChartPNG);
router.get('/export/:analysisId/pdf', exportChartPDF);

module.exports = router; 