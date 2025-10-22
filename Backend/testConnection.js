import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './models/employeemodel.js';
import Position from './models/positionmodel.js';

dotenv.config();

async function testDatabaseConnection() {
    try {
        console.log('Testing MongoDB Atlas connection...');
        console.log('Connection string:', process.env.MONGO_URI ? 'Set' : 'Not set');
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB Atlas successfully');
        console.log('Database name:', mongoose.connection.name);
        
        // Test employee collection
        console.log('\n--- Testing Employee Collection ---');
        const employeeCount = await Employee.countDocuments();
        console.log(`Total employees in database: ${employeeCount}`);
        
        if (employeeCount > 0) {
            const sampleEmployee = await Employee.findOne();
            console.log('Sample employee:', {
                id: sampleEmployee._id,
                name: sampleEmployee.employee_name,
                position: sampleEmployee.position,
                role: sampleEmployee.role
            });
        }
        
        // Test position collection
        console.log('\n--- Testing Position Collection ---');
        const positionCount = await Position.countDocuments();
        console.log(`Total positions in database: ${positionCount}`);
        
        if (positionCount > 0) {
            const samplePosition = await Position.findOne();
            console.log('Sample position:', {
                id: samplePosition._id,
                name: samplePosition.position_name,
                salary: samplePosition.base_salary
            });
        }
        
        // List all collections
        console.log('\n--- Available Collections ---');
        const collections = await mongoose.connection.db.listCollections().toArray();
        collections.forEach(collection => {
            console.log(`- ${collection.name}`);
        });
        
        console.log('\n✅ Database test completed successfully');
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('Full error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed');
        process.exit(0);
    }
}

testDatabaseConnection();