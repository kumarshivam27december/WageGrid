import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PositionSchema } from './models/positionmodel.js';

dotenv.config();

const Position = mongoose.model('Position', PositionSchema);

async function createDemoPositions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Demo positions
    const demoPositions = [
      {
        position_name: 'System Administrator',
        base_salary: 80000,
        transport_allowance: 5000,
        meal_allowance: 3000,
        user_id: 'admin'
      },
      {
        position_name: 'Software Developer',
        base_salary: 60000,
        transport_allowance: 4000,
        meal_allowance: 2500,
        user_id: 'admin'
      },
      {
        position_name: 'HR Manager',
        base_salary: 70000,
        transport_allowance: 4500,
        meal_allowance: 2800,
        user_id: 'admin'
      }
    ];

    for (const pos of demoPositions) {
      const exists = await Position.findOne({ position_name: pos.position_name });
      if (exists) {
        console.log(`${pos.position_name} already exists`);
      } else {
        await Position.create(pos);
        console.log(`${pos.position_name} created successfully`);
      }
    }

    console.log('Demo positions setup completed!');
  } catch (error) {
    console.error('Error creating demo positions:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createDemoPositions();
