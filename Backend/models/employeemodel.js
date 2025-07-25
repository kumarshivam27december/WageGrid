import mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    required: true
  },
  national_id: {
    type: String,
    required: true,
    maxlength: 16
  },
  employee_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  username: {
    type: String,
    required: true,
    maxlength: 120
  },
  password: {
    type: String
  },
  gender: {
    type: String,
    required: true,
    maxlength: 15
  },
  position: {
    type: String,
    required: true,
    maxlength: 50
  },
  date_joined: {
    type: String,
    required: true
  },
  employment_status: {
    type: String,
    required: true,
    maxlength: 50
  },
  photo: {
    type: String,
    maxlength: 100
  },
  url: {
    type: String
  },
  role: {
    type: String,
    required: true
  }
}, { collection: 'employees' });

export default mongoose.model('Employee', EmployeeSchema);