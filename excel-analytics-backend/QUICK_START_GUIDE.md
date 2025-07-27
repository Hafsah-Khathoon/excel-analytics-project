# 🚀 Excel Analytics - Quick Start Guide

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (free tier available)

## 🎯 Quick Setup (One-Time Only)

### Step 1: Install Dependencies
```bash
# Backend dependencies
cd excel-analytics-backend
npm install

# Frontend dependencies  
cd ../excel-analytics-frontend
npm install
```

### Step 2: Set Up Database (One-time setup)
```bash
cd excel-analytics-backend
node setup-user.js
```

## 🚀 Starting the Application

### Method 1: Using Batch Files (Windows)
1. **Start Backend:** Double-click `excel-analytics-backend/start-server.bat`
2. **Start Frontend:** Double-click `excel-analytics-frontend/start-frontend.bat`

### Method 2: Using Command Line
```bash
# Terminal 1 - Backend
cd excel-analytics-backend
npm start

# Terminal 2 - Frontend  
cd excel-analytics-frontend
npm start
```

## 🌐 Access URLs

### Frontend Application
- **URL:** http://localhost:3000
- **Description:** Main web application interface

### Backend API
- **URL:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 👤 Login Credentials

### Regular User Account
- **Email:** `test@example.com`
- **Password:** `test123`
- **Role:** User

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** Admin

## 📊 Available Features

### User Features
- ✅ Upload Excel/CSV files
- ✅ Select columns for visualization
- ✅ Generate 2D charts (Bar, Line, Scatter, Pie, Doughnut, Area)
- ✅ Generate 3D charts (3D Scatter, 3D Surface)
- ✅ Download charts as PNG or PDF
- ✅ View upload and analysis history

### Admin Features
- ✅ Access admin dashboard
- ✅ View system statistics
- ✅ Manage users
- ✅ Monitor usage analytics

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid Credentials" Error**
   - Run: `cd excel-analytics-backend && node setup-user.js`
   - Use exact credentials provided above

2. **Port Already in Use**
   - Backend: Change PORT in `.env` file or kill process on port 5000
   - Frontend: Change port in `package.json` or kill process on port 3000

3. **Database Connection Error**
   - Check MongoDB Atlas connection string
   - Ensure internet connection is stable

4. **Frontend Not Loading**
   - Check if backend is running on port 5000
   - Verify API_BASE_URL in `src/config.js`

### Port Configuration
- **Backend:** Port 5000 (configurable in `.env`)
- **Frontend:** Port 3000 (configurable in `package.json`)

## 📁 Project Structure
```
excel-analytics-backend/
├── config/          # Database configuration
├── controllers/     # API controllers
├── middleware/      # Authentication & upload middleware
├── models/          # Database models
├── routes/          # API routes
├── uploads/         # Uploaded files storage
└── server.js        # Main server file

excel-analytics-frontend/
├── src/
│   ├── components/  # React components
│   ├── contexts/    # React contexts
│   └── config.js    # API configuration
└── package.json
```

## 🔗 API Endpoints
- **Health Check:** `GET /api/health`
- **Authentication:** `POST /api/auth/login`, `POST /api/auth/register`
- **File Upload:** `POST /api/upload`
- **Chart Generation:** `POST /api/chart/generate`
- **Admin Panel:** `GET /api/admin/dashboard`

## 📞 Support
If you encounter any issues:
1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure both servers are running
4. Check database connection

---
**Happy Analyzing! 📊✨** 