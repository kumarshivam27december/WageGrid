import mongoose from 'mongoose';

export const PositionSchema = new mongoose.Schema({
  position_id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    required: true
  },
  position_name: {
    type: String,
    required: true,
    maxlength: 120
  },
  base_salary: {
    type: Number,
    required: true
  },
  transport_allowance: {
    type: Number,
    required: true
  },
  meal_allowance: {
    type: Number
  },
  user_id: {
    type: String,
    required: true
  }
}, { collection: 'positions' });

export default mongoose.model('Position', PositionSchema);
