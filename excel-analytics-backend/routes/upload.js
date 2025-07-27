const express = require('express');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  uploadFile,
  getUserUploads,
  getUploadById,
  deleteUpload
} = require('../controllers/uploadController');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Routes
router.post('/', upload.single('file'), uploadFile);
router.get('/', getUserUploads);
router.get('/:id', getUploadById);
router.delete('/:id', deleteUpload);

module.exports = router; 