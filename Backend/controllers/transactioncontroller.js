import Attendance from "../models/presencemodel.js";
import Employee from "../models/employeemodel.js";
import Position from "../models/positionmodel.js";
import SalaryDeduction from "../models/salarydeductionmodel.js";

import moment from "moment";
import "moment/locale/id.js";

// Method to view all attendance data
export const viewAttendanceData = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({});
    const attendanceResult = attendanceRecords.map((record) => {
      return {
        _id: record._id,
        attendance_id: record.attendance_id,
        month: record.month,
        employee_nik: record.employee_nik,
        employee_name: record.employee_name,
        gender: record.gender,
        position_name: record.position_name,
        present_days: record.present_days,
        sick_days: record.sick_days,
        absent_days: record.absent_days,
        createdAt: record.createdAt
      };
    });
    res.json(attendanceResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Method to view attendance data by ID
export const viewAttendanceDataById = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      attributes: [
        "id",
        "month",
        "nik",
        "employee_name",
        "gender",
        "position_name",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      }
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Method to create attendance data
export const createAttendanceData = async (req, res) => {
  const {
    employee_nik,
    employee_name,
    position_name,
    gender,
    present_days,
    sick_days,
    absent_days,
  } = req.body;

  try {
    // Check if employee exists
    const employee = await Employee.findOne({ national_id: employee_nik });
    if (!employee) {
      return res.status(404).json({ msg: "Employee with this NIK not found" });
    }

    // Check if position exists
    const position = await Position.findOne({ position_name: position_name });
    if (!position) {
      return res.status(404).json({ msg: "Position not found" });
    }

    // Check if attendance record already exists for this employee
    const existingRecord = await Attendance.findOne({ employee_nik: employee_nik });
    if (existingRecord) {
      return res.status(400).json({ msg: "Attendance record for this employee already exists" });
    }

    // Create new attendance record
    const month = moment().locale("id").format("MMMM");
    await Attendance.create({
      attendance_id: new Date().getTime(), // Generate unique ID
      month: month.toLowerCase(),
      employee_nik,
      employee_name: employee.employee_name,
      gender,
      position_name,
      present_days,
      sick_days,
      absent_days,
    });
    
    res.status(201).json({ msg: "Attendance data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Method to update attendance data
export const updateAttendanceData = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ msg: "Attendance record not found" });
    }

    const {
      employee_nik,
      employee_name,
      position_name,
      gender,
      present_days,
      sick_days,
      absent_days,
    } = req.body;

    await Attendance.findByIdAndUpdate(attendance._id, {
      employee_nik,
      employee_name,
      position_name,
      gender,
      present_days,
      sick_days,
      absent_days,
    });

    res.status(200).json({ msg: "Attendance data updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Method to delete attendance data
export const deleteAttendanceData = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ msg: "Attendance record not found" });
    }

    await Attendance.findByIdAndDelete(attendance._id);
    res.status(200).json({ msg: "Attendance data deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Method to create salary deduction data
export const createSalaryDeductionData = async (req, res) => {
  const { id, deduction, deduction_amount } = req.body;
  try {
    const existingDeduction = await SalaryDeduction.findOne({
      where: { deduction },
    });

    if (existingDeduction) {
      res.status(400).json({ msg: "Deduction already exists!" });
    } else {
      await SalaryDeduction.create({
        id,
        deduction,
        deduction_amount: deduction_amount.toLocaleString(),
      });
      res.json({ msg: "Salary deduction added successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
// Method to view all salary deduction data
export const viewSalaryDeductions = async (req, res) => {
  try {
    const deductions = await SalaryDeduction.find({});
    res.json(deductions);
  } catch (error) {
    console.log(error);
  }
};

// Method to view salary deduction data by ID
export const viewSalaryDeductionById = async (req, res) => {
  try {
    const deduction = await SalaryDeduction.findOne({
      attributes: ["id", "deduction", "deduction_amount"],
      where: {
        id: req.params.id,
      },
    });
    res.json(deduction);
  } catch (error) {
    console.log(error);
  }
};

// Method to update salary deduction data
export const updateSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Salary deduction updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// Method to delete salary deduction data
export const deleteSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Salary deduction deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// Get employee data
export const getEmployeeData = async () => {
  let employeeResult = [];
  try {
    const employeeList = await Employee.find({});
    employeeResult = employeeList.map((emp) => {
      const id = emp._id;
      const nik = emp.nik || emp.employee_nik || emp.national_id;
      const employeeName = emp.employee_name;
      const gender = emp.gender;
      const position = emp.position;
      return { id, nik, employeeName, gender, position };
    });
  } catch (error) {
    console.error(error);
  }
  return employeeResult;
};

// Get position data
export const getPositionData = async () => {
  let positionResult = [];
  try {
    const positions = await Position.find({});
    positionResult = positions.map((pos) => {
      const positionName = pos.position_name;
      const baseSalary = pos.base_salary;
      const transportAllowance = pos.transport_allowance;
      const mealAllowance = pos.meal_allowance;
      return { positionName, baseSalary, transportAllowance, mealAllowance };
    });
  } catch (error) {
    console.error(error);
  }
  return positionResult;
};

// Get attendance data
export const getAttendanceData = async () => {
  try {
    const attendanceList = await Attendance.find({});
    const attendanceResult = attendanceList.map((record) => {
      const createdAt = new Date(record.createdAt || record.date);
      const year = createdAt.getFullYear();
      const month = record.month;
      const nik = record.nik || record.employee_nik;
      const employeeName = record.employee_name;
      const position = record.position_name;
      const present = record.present || record.present_days;
      const sick = record.sick || record.sick_days;
      const absent = record.absent || record.absent_days;
      return {
        month,
        year,
        nik,
        employeeName,
        position,
        present,
        sick,
        absent,
      };
    });
    return attendanceResult;
  } catch (error) {
    console.error(error);
  }
};

// Get salary data (logic based on employee, position, attendance, and deductions)
export const getEmployeeSalaryData = async () => {
  try {
    const employeeData = await getEmployeeData();
    const positionData = await getPositionData();

    const salaryData = employeeData
      .filter((emp) =>
        positionData.some(
          (pos) => pos.positionName === emp.position
        )
      )
      .map((emp) => {
        const pos = positionData.find(
          (p) => p.positionName === emp.position
        );
        return {
          id: emp.id,
          nik: emp.nik,
          employeeName: emp.employeeName,
          position: emp.position,
          baseSalary: pos.baseSalary,
          transportAllowance: pos.transportAllowance,
          mealAllowance: pos.mealAllowance,
        };
      });

    return salaryData;
  } catch (error) {
    console.error(error);
  }
};
// View all employee salary data
export const viewEmployeeSalaries = async (req, res) => {
  try {
    const salaryData = await getEmployeeSalaryData();
    res.status(200).json(salaryData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// View salary data by employee name
export const viewSalaryByName = async (req, res) => {
  try {
    const salaryData = await getEmployeeSalaryData();
    const { name } = req.params;

    const filteredData = salaryData
      .filter((record) =>
        record.employee_name.toLowerCase().includes(name.toLowerCase().replace(/ /g, ""))
      )
      .map((record) => ({
        year: record.year,
        month: record.month,
        id: record.id,
        nik: record.nik,
        employee_name: record.employee_name,
        gender: record.gender,
        position: record.position,
        baseSalary: record.baseSalary,
        transportAllowance: record.transportAllowance,
        mealAllowance: record.mealAllowance,
        deduction: record.deduction,
        totalSalary: record.totalSalary,
      }));

    if (filteredData.length === 0) {
      return res.status(404).json({ msg: "Data not found" });
    }

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// View salary data by employee ID
export const viewSalaryById = async (req, res) => {
  try {
    const salaryData = await getEmployeeSalaryData();
    const id = parseInt(req.params.id);
    const found = salaryData.find((record) => record.id === id);

    if (!found) {
      return res.status(404).json({ msg: "Data not found" });
    }

    res.json(found);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// View salary data by month
export const viewSalaryByMonth = async (req, res) => {
  try {
    const salaryData = await getEmployeeSalaryData();
    const { month } = req.params;

    const attendanceRecord = await Attendance.findOne({
      attributes: ["month"],
      where: { month },
    });

    if (!attendanceRecord) {
      return res.status(404).json({ msg: `No data found for month ${month}` });
    }

    const filteredData = salaryData
      .filter((record) => record.month === attendanceRecord.month)
      .map((record) => ({
        month: record.month,
        id: record.id,
        nik: record.nik,
        employee_name: record.employee_name,
        gender: record.gender,
        position: record.position,
        baseSalary: record.baseSalary,
        transportAllowance: record.transportAllowance,
        mealAllowance: record.mealAllowance,
        deduction: record.deduction,
        totalSalary: record.totalSalary,
      }));

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// View salary data by year
export const viewSalaryByYear = async (req, res) => {
  try {
    const salaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const filteredData = salaryData
      .filter((record) => record.year === parseInt(year))
      .map((record) => ({
        year: record.year,
        id: record.id,
        nik: record.nik,
        employee_name: record.employee_name,
        gender: record.gender,
        position: record.position,
        present: record.present,
        sick: record.sick,
        absent: record.absent,
        baseSalary: record.baseSalary,
        transportAllowance: record.transportAllowance,
        mealAllowance: record.mealAllowance,
        deduction: record.deduction,
        totalSalary: record.totalSalary,
      }));

    if (filteredData.length === 0) {
      return res.status(404).json({ msg: `No data found for year ${year}` });
    }

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Salary report by year (returns just list of years for reporting)
export const salaryReportByYear = async (req, res) => {
  try {
    const salaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const filteredData = salaryData
      .filter((record) => record.year === parseInt(year))
      .map((record) => ({
        year: record.year,
        id: record.id,
        nik: record.nik,
        employee_name: record.employee_name,
        gender: record.gender,
        position: record.position,
        baseSalary: record.baseSalary,
        transportAllowance: record.transportAllowance,
        mealAllowance: record.mealAllowance,
        deduction: record.deduction,
        totalSalary: record.totalSalary,
      }));

    if (filteredData.length === 0) {
      return res.status(404).json({ msg: `No data found for year ${year}` });
    }

    const yearList = filteredData.map((record) => record.year);
    console.log(yearList); // Logging year report
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
