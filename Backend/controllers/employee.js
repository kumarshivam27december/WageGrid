import Employee from "../models/employeemodel.js";
import Attendance from "../models/presencemodel.js";
import { getEmployeeSalaryData } from "./transactioncontroller.js";
import { verifyUser } from "../middleware/AuthUser.js";

// Method for employee dashboard
export const employeeDashboard = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;

  const response = await Employee.findOne({
    _id: userId
  }).select('_id national_id employee_name gender position date_joined employment_status photo role');

  res.status(200).json(response);
};

// Method to view salary data of a single employee by month
export const viewEmployeeSalaryByMonth = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await Employee.findOne({
    _id: userId
  });

  try {
    const employeeSalaryData = await getEmployeeSalaryData();

    const attendanceRecord = await Attendance.findOne({
      month: req.params.month
    }).select('month');

    if (attendanceRecord) {
      const salaryDataByMonth = employeeSalaryData
        .filter((salary) => {
          return (
            salary.id === user._id.toString() &&
            salary.month === attendanceRecord.month
          );
        })
        .map((salary) => {
          return {
            month: attendanceRecord.month,
            year: salary.year,
            national_id: user.national_id,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            base_salary: salary.baseSalary,
            transport_allowance: salary.transportAllowance,
            meal_allowance: salary.mealAllowance,
            deduction: salary.deduction,
            total_salary: salary.total
          };
        });

      return res.json(salaryDataByMonth);
    }

    res.status(404).json({
      msg: `Salary data for month ${req.params.month} not found for employee ${user.employee_name}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Method to view salary data of a single employee by year
export const viewEmployeeSalaryByYear = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await Employee.findOne({
    _id: userId
  });

  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salary) => {
        return salary.id === user._id.toString() && salary.year === parseInt(year);
      })
      .map((salary) => {
        return {
          year: salary.year,
          month: salary.month,
          national_id: user.national_id,
          employee_name: user.employee_name,
          gender: user.gender,
          position: user.position,
          base_salary: salary.baseSalary,
          transport_allowance: salary.transportAllowance,
          meal_allowance: salary.mealAllowance,
          deduction: salary.deduction,
          total_salary: salary.total
        };
      });

    if (salaryDataByYear.length === 0) {
      return res.status(404).json({ msg: `No data found for year ${year}` });
    }

    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
