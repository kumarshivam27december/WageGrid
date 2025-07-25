import mongoose from 'mongoose';
import argon2 from 'argon2';
import dotenv from 'dotenv';
import { EmployeeSchema } from './models/employeemodel.js';

dotenv.config();

const Employee = mongoose.model('Employee', EmployeeSchema);

async function createDemoUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if demo users already exist
    const existingAdmin = await Employee.findOne({ username: 'admin' });
    const existingEmployee = await Employee.findOne({ username: 'employee' });

    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      // Create admin user
      const adminPassword = await argon2.hash('admin123');
      await Employee.create({
        employee_id: new mongoose.Types.ObjectId().toString(),
        national_id: '1234567890123456',
        employee_name: 'Administrator',
        username: 'admin',
        password: adminPassword,
        gender: 'Male',
        position: 'System Administrator',
        date_joined: '2024-01-01',
        employment_status: 'Active',
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }

    if (existingEmployee) {
      console.log('Employee user already exists');
    } else {
      // Create employee user
      const employeePassword = await argon2.hash('employee123');
      await Employee.create({
        employee_id: new mongoose.Types.ObjectId().toString(),
        national_id: '6543210987654321',
        employee_name: 'John Employee',
        username: 'employee',
        password: employeePassword,
        gender: 'Male',
        position: 'Software Developer',
        date_joined: '2024-01-15',
        employment_status: 'Active',
        role: 'employee'
      });
      console.log('Employee user created successfully');
    }

    console.log('Demo users setup completed!');
    console.log('Admin credentials: admin / admin123');
    console.log('Employee credentials: employee / employee123');

  } catch (error) {
    console.error('Error creating demo users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createDemoUsers(); 