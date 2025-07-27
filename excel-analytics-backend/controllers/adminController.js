const User = require('../models/User');
const Upload = require('../models/Upload');
const Analysis = require('../models/Analysis');

// Get admin dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });

    // Total uploads and analyses
    const totalUploads = await Upload.countDocuments();
    const totalAnalyses = await Analysis.countDocuments();

    // Recent activity
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username email createdAt');

    const recentUploads = await Upload.find()
      .populate('userId', 'username')
      .sort({ uploadDate: -1 })
      .limit(5)
      .select('originalName uploadDate userId');

    const recentAnalyses = await Analysis.find()
      .populate('userId', 'username')
      .populate('uploadId', 'originalName')
      .sort({ analysisDate: -1 })
      .limit(5)
      .select('chartType chartTitle analysisDate userId uploadId');

    // Usage statistics by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const uploadsByDate = await Upload.aggregate([
      {
        $match: {
          uploadDate: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$uploadDate" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const analysesByDate = await Analysis.aggregate([
      {
        $match: {
          analysisDate: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$analysisDate" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Chart type distribution
    const chartTypeStats = await Analysis.aggregate([
      {
        $group: {
          _id: "$chartType",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      stats: {
        totalUsers,
        activeUsers,
        adminUsers,
        totalUploads,
        totalAnalyses
      },
      recentActivity: {
        users: recentUsers,
        uploads: recentUploads,
        analyses: recentAnalyses
      },
      trends: {
        uploadsByDate,
        analysesByDate
      },
      chartTypeStats
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user details with statistics
const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user's uploads and analyses
    const uploads = await Upload.find({ userId })
      .sort({ uploadDate: -1 })
      .select('originalName uploadDate fileSize');

    const analyses = await Analysis.find({ userId })
      .populate('uploadId', 'originalName')
      .sort({ analysisDate: -1 })
      .select('chartType chartTitle analysisDate downloadCount');

    // Calculate user statistics
    const totalFileSize = uploads.reduce((sum, upload) => sum + upload.fileSize, 0);
    const totalDownloads = analyses.reduce((sum, analysis) => sum + analysis.downloadCount, 0);

    res.json({
      user,
      statistics: {
        uploads: uploads.length,
        analyses: analyses.length,
        totalFileSize,
        totalDownloads
      },
      uploads,
      analyses
    });

  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (isActive !== undefined) {
      user.isActive = isActive;
    }
    if (role && ['user', 'admin'].includes(role)) {
      user.role = role;
    }

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user's uploads and analyses
    await Upload.deleteMany({ userId });
    await Analysis.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User and all associated data deleted successfully' });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Get system-wide upload statistics
const getUploadStats = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const uploads = await Upload.find({
      uploadDate: { $gte: daysAgo }
    }).populate('userId', 'username');

    const stats = {
      totalUploads: uploads.length,
      totalFileSize: uploads.reduce((sum, upload) => sum + upload.fileSize, 0),
      averageFileSize: uploads.length > 0 ? uploads.reduce((sum, upload) => sum + upload.fileSize, 0) / uploads.length : 0,
      uploadsByUser: {},
      uploadsByDate: {}
    };

    uploads.forEach(upload => {
      // By user
      const username = upload.userId?.username || 'Unknown';
      stats.uploadsByUser[username] = (stats.uploadsByUser[username] || 0) + 1;

      // By date
      const date = upload.uploadDate.toISOString().split('T')[0];
      stats.uploadsByDate[date] = (stats.uploadsByDate[date] || 0) + 1;
    });

    res.json(stats);

  } catch (error) {
    console.error('Upload stats error:', error);
    res.status(500).json({ error: 'Failed to fetch upload statistics' });
  }
};

// Get system-wide analysis statistics
const getAnalysisStats = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const analyses = await Analysis.find({
      analysisDate: { $gte: daysAgo }
    }).populate('userId', 'username');

    const stats = {
      totalAnalyses: analyses.length,
      totalDownloads: analyses.reduce((sum, analysis) => sum + analysis.downloadCount, 0),
      analysesByChartType: {},
      analysesByUser: {},
      analysesByDate: {}
    };

    analyses.forEach(analysis => {
      // By chart type
      stats.analysesByChartType[analysis.chartType] = (stats.analysesByChartType[analysis.chartType] || 0) + 1;

      // By user
      const username = analysis.userId?.username || 'Unknown';
      stats.analysesByUser[username] = (stats.analysesByUser[username] || 0) + 1;

      // By date
      const date = analysis.analysisDate.toISOString().split('T')[0];
      stats.analysesByDate[date] = (stats.analysesByDate[date] || 0) + 1;
    });

    res.json(stats);

  } catch (error) {
    console.error('Analysis stats error:', error);
    res.status(500).json({ error: 'Failed to fetch analysis statistics' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUserStatus,
  deleteUser,
  getUploadStats,
  getAnalysisStats
}; 