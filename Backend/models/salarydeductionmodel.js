import mongoose from 'mongoose';

export const SalaryDeductionSchema = new mongoose.Schema({
  deduction_id: {
    type: Number,
    required: true,
    unique: true
  },
  deduction_type: {
    type: String,
    required: true,
    maxlength: 120
  },
  deduction_amount: {
    type: Number,
    required: true
  }
}, { collection: 'salary_deductions' });

export default mongoose.model('SalaryDeduction', SalaryDeductionSchema);
