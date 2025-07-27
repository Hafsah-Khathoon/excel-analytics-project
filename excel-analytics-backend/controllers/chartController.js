const XLSX = require('xlsx');
const Upload = require('../models/Upload');
const Analysis = require('../models/Analysis');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');


// Generate chart data from Excel file
const generateChart = async (req, res) => {
  try {
    const {
      uploadId,
      chartType,
      chartTitle,
      xAxis,
      yAxis,
      zAxis,
      chartConfig
    } = req.body;

    // Get upload details
    const upload = await Upload.findOne({
      _id: uploadId,
      userId: req.user._id
    });

    if (!upload) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    // Read Excel file
    const workbook = XLSX.readFile(upload.filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      return res.status(400).json({ error: 'No data found in the file' });
    }

    // Extract data for chart
    const chartData = extractChartData(jsonData, xAxis, yAxis, zAxis, chartType);

    // Create analysis record
    const analysis = new Analysis({
      userId: req.user._id,
      uploadId: uploadId,
      chartType: chartType,
      chartTitle: chartTitle,
      xAxis: xAxis,
      yAxis: yAxis,
      zAxis: zAxis,
      chartConfig: chartConfig,
      dataPoints: chartData.dataPoints,
      chartData: chartData,
      is3D: chartType.includes('3d')
    });

    await analysis.save();

    // Update user analysis count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { analysisCount: 1 }
    });

    res.json({
      message: 'Chart generated successfully',
      analysis: {
        id: analysis._id,
        chartType: analysis.chartType,
        chartTitle: analysis.chartTitle,
        dataPoints: analysis.dataPoints,
        is3D: analysis.is3D,
        analysisDate: analysis.analysisDate
      },
      chartData: chartData
    });

  } catch (error) {
    console.error('Chart generation error:', error);
    res.status(500).json({ error: 'Failed to generate chart' });
  }
};

// Extract and process data for chart
const extractChartData = (jsonData, xAxis, yAxis, zAxis, chartType) => {
  const xColumn = xAxis.column;
  const yColumn = yAxis.column;
  const zColumn = zAxis?.column;

  let labels = [];
  let datasets = [];
  let dataPoints = 0;

  if (chartType === 'pie' || chartType === 'doughnut') {
    // For pie/doughnut charts, aggregate data
    const aggregated = {};
    jsonData.forEach(row => {
      const xValue = row[xColumn] || 'Unknown';
      const yValue = parseFloat(row[yColumn]) || 0;
      aggregated[xValue] = (aggregated[xValue] || 0) + yValue;
    });

    labels = Object.keys(aggregated);
    datasets = [{
      data: Object.values(aggregated),
      backgroundColor: generateColors(labels.length)
    }];
    dataPoints = labels.length;

  } else if (chartType.includes('3d')) {
    // For 3D charts
    const data = jsonData.map(row => ({
      x: parseFloat(row[xColumn]) || 0,
      y: parseFloat(row[yColumn]) || 0,
      z: parseFloat(row[zColumn]) || 0
    })).filter(point => !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z));

    labels = data.map((_, index) => `Point ${index + 1}`);
    datasets = [{
      data: data,
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }];
    dataPoints = data.length;

  } else {
    // For 2D charts
    const sortedData = jsonData
      .map(row => ({
        x: row[xColumn],
        y: parseFloat(row[yColumn]) || 0
      }))
      .filter(point => point.x !== undefined && !isNaN(point.y))
      .sort((a, b) => {
        if (typeof a.x === 'number' && typeof b.x === 'number') {
          return a.x - b.x;
        }
        return String(a.x).localeCompare(String(b.x));
      });

    labels = sortedData.map(point => point.x);
    datasets = [{
      label: yAxis.label || yColumn,
      data: sortedData.map(point => point.y),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      fill: chartType === 'area'
    }];
    dataPoints = sortedData.length;
  }

  return {
    labels,
    datasets,
    dataPoints,
    chartType,
    xAxis: xAxis.label || xColumn,
    yAxis: yAxis.label || yColumn,
    zAxis: zAxis?.label || zColumn
  };
};

// Generate random colors for charts
const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 360 / count) % 360;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

// Get user's analyses
const getUserAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user._id })
      .populate('uploadId', 'originalName')
      .sort({ analysisDate: -1 });

    res.json({ analyses });
  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
};

// Get analysis by ID
const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('uploadId', 'originalName');

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({ analysis });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
};

// Export chart as PNG
const exportChartPNG = async (req, res) => {
  try {
    const { analysisId } = req.params;
    
    const analysis = await Analysis.findOne({
      _id: analysisId,
      userId: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    // Generate HTML for chart download
    const chartHTML = generateChartHTML(analysis.chartData, analysis.chartType);
    
    // Update download count
    await Analysis.findByIdAndUpdate(analysisId, {
      $inc: { downloadCount: 1 }
    });

    // Return HTML that can be used to generate PNG
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="chart-${analysisId}.html"`);
    res.send(chartHTML);

  } catch (error) {
    console.error('Export PNG error:', error);
    res.status(500).json({ error: 'Failed to export chart as HTML' });
  }
};

// Export chart as PDF
const exportChartPDF = async (req, res) => {
  try {
    const { analysisId } = req.params;
    
    const analysis = await Analysis.findOne({
      _id: analysisId,
      userId: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    // Generate HTML for chart download
    const chartHTML = generateChartHTML(analysis.chartData, analysis.chartType);
    
    // Update download count
    await Analysis.findByIdAndUpdate(analysisId, {
      $inc: { downloadCount: 1 }
    });

    // Return HTML that can be used to generate PDF
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="chart-${analysisId}-pdf.html"`);
    res.send(chartHTML);

  } catch (error) {
    console.error('Export PDF error:', error);
    res.status(500).json({ error: 'Failed to export chart as HTML' });
  }
};

// Generate HTML for chart rendering
const generateChartHTML = (chartData, chartType) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js"></script>
      <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        .chart-container { width: 800px; height: 600px; margin: 0 auto; }
      </style>
    </head>
    <body>
      <div class="chart-container">
        <canvas id="chartCanvas"></canvas>
      </div>
      <script>
        const ctx = document.getElementById('chartCanvas').getContext('2d');
        const chartData = ${JSON.stringify(chartData)};
        
        new Chart(ctx, {
          type: '${chartType}',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: '${chartData.chartTitle || 'Chart'}'
              }
            }
          }
        });
      </script>
    </body>
    </html>
  `;
};

module.exports = {
  generateChart,
  getUserAnalyses,
  getAnalysisById,
  exportChartPNG,
  exportChartPDF
}; 