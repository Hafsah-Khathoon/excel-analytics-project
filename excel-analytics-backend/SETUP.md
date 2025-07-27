# Excel Analytics Project Setup Guide

## Quick Start Options

### Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for a free account
   - Create a new cluster (free tier)
   - Get your connection string

2. **Update Environment Variables**
   - Edit the `.env` file in the backend directory
   - Replace the MONGODB_URI with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/excel-analytics?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB Installation

1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Install with default settings
   - Start MongoDB service

2. **Verify Installation**
   ```bash
   mongod --version
   ```

## Starting the Application

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd excel-analytics-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd excel-analytics-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Default Admin Account

After setting up the database, you can create an admin account by registering a user and then manually updating the role in the database to "admin".

## Features Available

✅ **Authentication**: JWT-based login/register
✅ **File Upload**: Excel/CSV file upload with Multer
✅ **Data Parsing**: SheetJS for Excel parsing
✅ **Chart Generation**: 2D charts (Bar, Line, Scatter, Pie, Doughnut, Area)
✅ **3D Visualization**: Three.js for 3D charts
✅ **Download Options**: PNG and PDF export
✅ **User History**: Upload and analysis tracking
✅ **Admin Dashboard**: User management and statistics

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings
- Verify network connectivity

### Port Conflicts
- Backend runs on port 5000
- Frontend runs on port 3000
- Change ports in .env files if needed

### File Upload Issues
- Ensure uploads directory exists
- Check file size limits (10MB default)
- Verify file format (Excel/CSV only) 