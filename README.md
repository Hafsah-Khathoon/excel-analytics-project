📊 Excel Analytics Platform

A full-stack web application for uploading Excel files, analyzing data, and generating interactive 2D/3D charts with advanced data visualization capabilities.

![Excel Analytics](https://img.shields.io/badge/Excel-Analytics-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248)
![Chart.js](https://img.shields.io/badge/Chart.js-3.9.1-FF6384)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000)

## 🎯 Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure login/logout
- **User registration** with email validation
- **Role-based access control** (User/Admin)
- **Protected routes** and middleware
- **Session management** with token expiration
- **Rate limiting** and security headers

### 📁 File Management
- **Excel/CSV file upload** with drag-and-drop interface
- **File validation** (type, size, format checking)
- **Data parsing** using SheetJS (XLSX)
- **Column detection** and type inference
- **Sample data preview** before analysis
- **Upload history** tracking

### 📈 Data Visualization
- **2D Charts**: Bar, Line, Scatter, Pie, Doughnut, Area
- **3D Charts**: 3D Scatter, 3D Surface plots
- **Interactive charts** with Chart.js and Three.js
- **Dynamic axis selection** (X, Y, Z for 3D)
- **Customizable chart options** (colors, titles, legends)
- **Real-time chart updates**

### 📤 Export & Download
- **PNG export** using html2canvas
- **PDF export** using jsPDF
- **High-quality downloads** with preserved formatting
- **Chart data preservation**

### 👥 User Management
- **Personal dashboard** with usage statistics
- **Analysis history** with chart details
- **File management** (view, delete operations)
- **Usage analytics** (upload count, analysis count)

### 🔧 Admin Dashboard
- **System-wide statistics** (users, uploads, analyses)
- **User management** (view, activate/deactivate, delete)
- **Usage analytics** and trends
- **Chart type distribution** statistics

## 🏗️ Architecture

```
excel-analytics/
├── excel-analytics-backend/     # Node.js + Express API
│   ├── config/                  # Database configuration
│   ├── controllers/             # Business logic
│   ├── middleware/              # Authentication & validation
│   ├── models/                  # MongoDB schemas
│   ├── routes/                  # API endpoints
│   └── uploads/                 # File storage
└── excel-analytics-frontend/    # React + Tailwind CSS
    ├── src/
    │   ├── components/          # React components
    │   ├── contexts/            # Global state management
    │   └── App.js              # Main application
    └── public/                 # Static assets
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/excel-analytics.git
   cd excel-analytics
   ```

2. **Set up Backend**
   ```bash
   cd excel-analytics-backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   npm start
   ```

3. **Set up Frontend**
   ```bash
   cd excel-analytics-frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/excel-analytics
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 📖 Usage Guide

### 1. User Registration/Login
- Navigate to the login page
- Register a new account or login with existing credentials
- JWT tokens are automatically managed

### 2. File Upload
- Drag and drop Excel/CSV files or click to browse
- Supported formats: `.xlsx`, `.xls`, `.csv`
- Maximum file size: 10MB
- Preview data before proceeding

### 3. Data Analysis
- Select columns for X, Y, and Z axes (for 3D charts)
- Choose chart type from available options
- Customize chart appearance and settings
- Generate interactive visualizations

### 4. Export Charts
- Download charts as PNG images
- Export charts as PDF documents
- Share visualizations with others

### 5. Admin Features
- Access admin dashboard with admin privileges
- Monitor system usage and user statistics
- Manage user accounts and permissions

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling
- **XLSX** - Excel file parsing
- **Chart.js** - Chart generation
- **Three.js** - 3D visualization

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Chart.js** - Chart rendering
- **Three.js** - 3D graphics
- **React Dropzone** - File upload interface
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 📁 Project Structure

### Backend Structure
```
excel-analytics-backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── uploadController.js  # File upload & parsing
│   ├── chartController.js   # Chart generation
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── upload.js           # File upload handling
├── models/
│   ├── User.js             # User schema
│   ├── Upload.js           # Upload schema
│   └── Analysis.js         # Analysis schema
├── routes/
│   ├── auth.js             # Auth endpoints
│   ├── upload.js           # Upload endpoints
│   ├── chart.js            # Chart endpoints
│   └── admin.js            # Admin endpoints
└── server.js               # Main server file
```

### Frontend Structure
```
excel-analytics-frontend/
├── src/
│   ├── components/
│   │   ├── auth/           # Login, Register, Protected Routes
│   │   ├── layout/         # Navbar, Layout components
│   │   ├── dashboard/      # User dashboard
│   │   ├── upload/         # File upload interface
│   │   ├── analysis/       # Chart generation & 3D visualization
│   │   ├── history/        # Upload & analysis history
│   │   └── admin/          # Admin dashboard
│   ├── contexts/
│   │   └── AuthContext.js  # Global auth state
│   └── App.js              # Main app with routing
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### File Upload
- `POST /api/upload` - Upload Excel file
- `GET /api/upload/history` - Get upload history
- `DELETE /api/upload/:id` - Delete uploaded file

### Charts
- `POST /api/chart/generate` - Generate chart
- `GET /api/chart/history` - Get analysis history
- `POST /api/chart/export` - Export chart

### Admin
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - User management
- `PUT /api/admin/users/:id` - Update user status

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the React application: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for 2D charting
- [Three.js](https://threejs.org/) for 3D visualization
- [SheetJS](https://sheetjs.com/) for Excel file parsing
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: [your-email@example.com]

---

**Made with ❤️ for data visualization enthusiasts** 
