import express from 'express';

/* === Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === Employee Controllers === */
import {
    getAllEmployees,
    getEmployeeByID,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeByNationalID,
    getEmployeeByName,
} from '../controllers/employeedata.js';

/* === Position Controllers === */
import {
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition,
} from "../controllers/jobdata.js";

/* === Attendance and Salary Controllers === */
import {
    viewAttendanceData,
    createAttendanceData,
    updateAttendanceData,
    deleteAttendanceData,
    viewAttendanceDataById,
    viewSalaryByName,
    viewEmployeeSalaries,
    viewSalaryByMonth,
    viewSalaryByYear
} from "../controllers/transactioncontroller.js";

/* === Salary Deduction Controllers === */
import {
    createSalaryDeductionData,
    deleteSalaryDeduction,
    viewSalaryDeductionById,
    updateSalaryDeduction,
    viewSalaryDeductions
} from "../controllers/transactioncontroller.js";

/* === Reports Controllers === */
import {
    viewEmployeeAttendanceByMonth,
    viewEmployeeAttendanceByYear,
    viewEmployeeSalaryReport,
    viewEmployeeSalaryReportByMonth,
    viewEmployeeSalaryReportByName,
    viewEmployeeSalaryReportByYear,
    viewSalarySlipByMonth,
    viewSalarySlipByName,
    viewSalarySlipByYear,
} from "../controllers/reportcontroller.js";

/* === Auth & Dashboard Controllers === */
import { logout, changePassword } from '../controllers/Auth.js';
import {
    employeeDashboard,
    viewEmployeeSalaryByMonth,
    viewEmployeeSalaryByYear
} from '../controllers/employee.js';

const router = express.Router();

/* ==== Master Data ==== */
// Employee Routes
router.get('/employees', verifyUser, adminOnly, getAllEmployees);
router.get('/employees/id/:id', verifyUser, adminOnly, getEmployeeByID);
router.get('/employees/nik/:nik', verifyUser, adminOnly, getEmployeeByNationalID);
router.get('/employees/name/:name', verifyUser, getEmployeeByName);
router.post('/employees', verifyUser, adminOnly, createEmployee);
router.patch('/employees/:id', verifyUser, adminOnly, updateEmployee);
router.delete('/employees/:id', verifyUser, adminOnly, deleteEmployee);
router.patch('/employees/:id/change_password', verifyUser, adminOnly, changePassword);

// Position Routes
router.get('/positions', verifyUser, adminOnly, getAllPositions);
router.get('/positions/:id', verifyUser, adminOnly, getPositionById);
router.post('/positions', verifyUser, adminOnly, createPosition);
router.patch('/positions/:id', verifyUser, adminOnly, updatePosition);
router.delete('/positions/:id', verifyUser, adminOnly, deletePosition);

/* ==== Attendance Routes ==== */
router.get('/attendance', verifyUser, adminOnly, viewAttendanceData);
router.get('/attendance/:id', verifyUser, adminOnly, viewAttendanceDataById);
router.post('/attendance', verifyUser, createAttendanceData);
router.patch('/attendance/update/:id', verifyUser, adminOnly, updateAttendanceData);
router.delete('/attendance/:id', verifyUser, adminOnly, deleteAttendanceData);

/* ==== Deductions ==== */
router.get('/deductions', verifyUser, adminOnly, viewSalaryDeductions);
router.get('/deductions/:id', verifyUser, adminOnly, viewSalaryDeductionById);
router.post('/deductions', verifyUser, adminOnly, createSalaryDeductionData);
router.patch('/deductions/update/:id', verifyUser, adminOnly, updateSalaryDeduction);
router.delete('/deductions/:id', verifyUser, adminOnly, deleteSalaryDeduction);

/* ==== Salary Data ==== */
router.get('/salaries', viewEmployeeSalaries);
router.get('/salaries/name/:name', verifyUser, viewSalaryByName);
router.get('/salaries/month/:month', viewSalaryByMonth);
router.get('/salaries/year/:year', viewSalaryByYear);

/* ==== Reports ==== */
// Salary Reports
router.get('/reports/salary', verifyUser, adminOnly, viewEmployeeSalaryReport);
router.get('/reports/salary/name/:name', verifyUser, adminOnly, viewEmployeeSalaryReportByName);
router.get('/reports/salary/month/:month', verifyUser, adminOnly, viewEmployeeSalaryReportByMonth);
router.get('/reports/salary/year/:year', verifyUser, adminOnly, viewEmployeeSalaryReportByYear);

// Attendance Reports
router.get('/reports/attendance/month/:month', verifyUser, adminOnly, viewEmployeeAttendanceByMonth);
router.get('/reports/attendance/year/:year', verifyUser, adminOnly, viewEmployeeAttendanceByYear);

// Salary Slip
router.get('/salary-slip/name/:name', verifyUser, adminOnly, viewSalarySlipByName);
router.get('/salary-slip/month/:month', verifyUser, adminOnly, viewSalarySlipByMonth);
router.get('/salary-slip/year/:year', verifyUser, adminOnly, viewSalarySlipByYear);

/* ==== Authentication ==== */
router.patch('/change_password', verifyUser, changePassword);
router.delete('/logout', logout);

/* ==== Employee (Self-Service) ==== */
router.get('/dashboard', verifyUser, employeeDashboard);
router.get('/salary/month/:month', verifyUser, viewEmployeeSalaryByMonth);
router.get('/salary/year/:year', verifyUser, viewEmployeeSalaryByYear);
router.patch('/change_password', verifyUser, changePassword);
router.delete('/logout', logout);

export default router;