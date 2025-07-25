import mongoose from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
  attendance_id: {
    type: Number,
    required: true,
    unique: true
  },
  month: {
    type: String,
    required: true,
    maxlength: 15
  },
  employee_nik: {
    type: String,
    required: true,
    maxlength: 16
  },
  employee_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  gender: {
    type: String,
    maxlength: 20
  },
  position_name: {
    type: String,
    maxlength: 50
  },
  present_days: {
    type: Number
  },
  sick_days: {
    type: Number
  },
  absent_days: {
    type: Number
  }
}, { collection: 'attendances' });

export default mongoose.model('Attendance', AttendanceSchema);
