const express = require('express');
const { adminAuth } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUserStatus,
  deleteUser,
  getUploadStats,
  getAnalysisStats
} = require('../controllers/adminController');

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// Routes
router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.put('/users/:userId', updateUserStatus);
router.delete('/users/:userId', deleteUser);
router.get('/stats/uploads', getUploadStats);
router.get('/stats/analyses', getAnalysisStats);

module.exports = router; 