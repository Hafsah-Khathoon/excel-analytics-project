const XLSX = require('xlsx');
const Upload = require('../models/Upload');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Upload and parse Excel file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;
    const fileSize = req.file.size;
    const mimeType = req.file.mimetype;

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    
    if (sheetNames.length === 0) {
      return res.status(400).json({ error: 'No sheets found in the Excel file' });
    }

    // Get first sheet data
    const sheetName = sheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonData.length === 0) {
      return res.status(400).json({ error: 'No data found in the Excel file' });
    }

    // Extract headers and sample data
    const headers = jsonData[0];
    const sampleData = jsonData.slice(1, 6); // First 5 rows as sample

    // Determine column types
    const columns = headers.map((header, index) => {
      const columnData = jsonData.slice(1).map(row => row[index]).filter(val => val !== undefined);
      const sampleValues = columnData.slice(0, 5);
      
      let type = 'string';
      if (columnData.length > 0) {
        const firstValue = columnData[0];
        if (typeof firstValue === 'number' || !isNaN(firstValue)) {
          type = 'number';
        } else if (firstValue instanceof Date || !isNaN(new Date(firstValue))) {
          type = 'date';
        }
      }

      return {
        name: header,
        type: type,
        sampleData: sampleValues.map(val => String(val))
      };
    });

    // Create upload record
    const upload = new Upload({
      userId: req.user._id,
      filename: req.file.filename,
      originalName: originalName,
      filePath: filePath,
      fileSize: fileSize,
      mimeType: mimeType,
      columns: columns,
      rowCount: jsonData.length - 1, // Exclude header row
      sheetNames: sheetNames,
      isProcessed: true
    });

    await upload.save();

    // Update user upload count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { uploadCount: 1 }
    });

    res.status(200).json({
      message: 'File uploaded and processed successfully',
      upload: {
        id: upload._id,
        filename: upload.filename,
        originalName: upload.originalName,
        columns: upload.columns,
        rowCount: upload.rowCount,
        sheetNames: upload.sheetNames,
        uploadDate: upload.uploadDate
      },
      preview: {
        headers: headers,
        sampleData: sampleData
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if processing failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'Failed to process uploaded file' });
  }
};

// Get user's uploads
const getUserUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user._id })
      .sort({ uploadDate: -1 })
      .select('-filePath');

    res.json({ uploads });
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
};

// Get upload by ID
const getUploadById = async (req, res) => {
  try {
    const upload = await Upload.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).select('-filePath');

    if (!upload) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    res.json({ upload });
  } catch (error) {
    console.error('Get upload error:', error);
    res.status(500).json({ error: 'Failed to fetch upload' });
  }
};

// Delete upload
const deleteUpload = async (req, res) => {
  try {
    const upload = await Upload.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!upload) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(upload.filePath)) {
      fs.unlinkSync(upload.filePath);
    }

    // Delete upload record
    await Upload.findByIdAndDelete(req.params.id);

    // Update user upload count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { uploadCount: -1 }
    });

    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({ error: 'Failed to delete upload' });
  }
};

module.exports = {
  uploadFile,
  getUserUploads,
  getUploadById,
  deleteUpload
}; 