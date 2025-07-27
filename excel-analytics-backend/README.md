# Excel Analytics Platform

A comprehensive web application for Excel file upload, data analysis, and interactive chart generation with secure user authentication and admin management.

## 🚀 Features

### 🔐 Secure Authentication
- **JWT-based authentication** for users and admins
- **User registration and login** with form validation
- **Role-based access control** (User/Admin)
- **Protected routes** and secure API endpoints

### 📊 Excel File Processing
- **Drag & drop file upload** with visual feedback
- **Support for multiple formats**: .xlsx, .xls, .csv
- **Automatic column detection** and data type identification
- **File validation** (size, format, content)
- **Upload history** and file management

### 📈 Interactive Data Visualization
- **2D Charts**: Bar, Line, Scatter, Pie, Doughnut, Area
- **3D Visualizations**: 3D Scatter plots and Surface charts
- **Interactive charts** using Chart.js and Three.js
- **Customizable options**: colors, titles, axis labels
- **Real-time chart preview** and configuration

### 💾 Export & Download
- **PNG export** for high-quality images
- **PDF export** for document sharing
- **Download tracking** and analytics
- **Chart history** management

### 👥 User Management
- **User dashboard** with statistics and activity
- **Upload and analysis history**
- **Profile management**
- **Admin dashboard** for comprehensive user management

### 🎨 Modern UI/UX
- **Responsive design** for all devices
- **Modern UI** with Tailwind CSS
- **Smooth animations** and transitions
- **Intuitive navigation** and user experience

## 🏗️ Architecture

### Backend (Node.js/Express)
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT authentication** with bcrypt password hashing
- **Multer** for file upload handling
- **SheetJS** for Excel file parsing
- **Security middleware** (helmet, rate limiting, CORS)

### Frontend (React)
- **React 19** with modern hooks
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Chart.js** for 2D visualizations
- **Three.js** for 3D charts
- **Axios** for API communication

## 📁 Project Structure

```
excel-analytics-backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── adminController.js   # Admin management
│   ├── authController.js    # Authentication
│   ├── chartController.js   # Chart generation
│   └── uploadController.js  # File upload
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── upload.js           # File upload handling
├── models/
│   ├── Analysis.js         # Chart analysis model
│   ├── Upload.js           # File upload model
│   └── User.js             # User model
├── routes/
│   ├── admin.js            # Admin routes
│   ├── auth.js             # Auth routes
│   ├── chart.js            # Chart routes
│   └── upload.js           # Upload routes
├── uploads/                # File storage
├── package.json
└── server.js               # Main server file

excel-analytics-frontend/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin components
│   │   ├── analysis/       # Chart components
│   │   ├── auth/           # Auth components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── history/        # History components
│   │   ├── layout/         # Layout components
│   │   └── upload/         # Upload components
│   ├── contexts/           # React contexts
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── package.json
└── tailwind.config.js      # Tailwind configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd excel-analytics-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/excel-analytics
   JWT_SECRET=your-secret-key-here
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd excel-analytics-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Database Setup
The application uses MongoDB. You can use:
- **Local MongoDB**: Install and run locally
- **MongoDB Atlas**: Cloud database service
- **Docker**: Run MongoDB in a container

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/excel-analytics
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### File Upload
- `POST /api/upload` - Upload Excel file
- `GET /api/upload` - Get user uploads
- `GET /api/upload/:id` - Get specific upload
- `DELETE /api/upload/:id` - Delete upload

### Chart Generation
- `POST /api/chart/generate` - Generate chart
- `GET /api/chart/analyses` - Get user analyses
- `GET /api/chart/analyses/:id` - Get specific analysis
- `GET /api/chart/export/:format/:id` - Export chart

### Admin (Admin only)
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🎯 Usage Guide

### For Users

1. **Register/Login**
   - Create an account or login with existing credentials
   - Access your personalized dashboard

2. **Upload Files**
   - Drag & drop Excel files or click to browse
   - View file preview and column information
   - Files are automatically processed and stored

3. **Create Charts**
   - Select uploaded file as data source
   - Choose chart type (2D or 3D)
   - Configure X, Y, and Z axes
   - Customize colors and styling
   - Generate interactive charts

4. **Export & Share**
   - Download charts as PNG or PDF
   - View analysis history
   - Track download statistics

### For Admins

1. **Dashboard Overview**
   - View system statistics
   - Monitor user activity
   - Track upload and analysis trends

2. **User Management**
   - View all registered users
   - Activate/deactivate accounts
   - Change user roles
   - Delete user accounts

3. **System Monitoring**
   - Monitor file uploads
   - Track chart generation
   - View usage analytics

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password hashing** with bcrypt
- **Input validation** and sanitization
- **Rate limiting** to prevent abuse
- **CORS protection** for cross-origin requests
- **Helmet.js** for security headers
- **Protected routes** with role-based access

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build the application
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure environment variables

## 🧪 Testing

### Backend Testing
```bash
cd excel-analytics-backend
npm test
```

### Frontend Testing
```bash
cd excel-analytics-frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added 3D chart support
- **v1.2.0** - Enhanced admin dashboard
- **v1.3.0** - Improved UI/UX and performance

## 🎉 Acknowledgments

- **Chart.js** for 2D chart library
- **Three.js** for 3D graphics
- **Tailwind CSS** for styling framework
- **React** for frontend framework
- **Express.js** for backend framework
- **MongoDB** for database

---

**Excel Analytics Platform** - Transform your data into beautiful visualizations! 📊✨ 