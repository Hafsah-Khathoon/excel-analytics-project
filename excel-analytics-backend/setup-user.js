const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const createTestUser = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('✅ Test user already exists!');
      console.log('Email: test@example.com');
      console.log('Password: test123');
      console.log('Role:', existingUser.role);
      return;
    }
    
    // Create test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'test123',
      role: 'user'
    });
    
    await testUser.save();
    
    console.log('✅ Test user created successfully!');
    console.log('Email: test@example.com');
    console.log('Password: test123');
    console.log('Role: user');
    
    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    
    await adminUser.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createTestUser(); 