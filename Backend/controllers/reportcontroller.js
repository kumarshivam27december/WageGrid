import {
    getEmployeeSalaryData,
    getAttendanceData,
    viewSalaryByYear
  } from "./transactioncontroller.js";
  
  // View all employee salary reports
  export const viewEmployeeSalaryReport = async (req, res) => {
    try {
      const salaryReport = await getEmployeeSalaryData(req, res);
      res.status(200).json(salaryReport);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // View employee salary report by month
  export const viewEmployeeSalaryReportByMonth = async (req, res) => {
    try {
      const { month } = req.params;
      const monthlySalaryData = await getEmployeeSalaryData(req, res);
  
      const filteredData = monthlySalaryData.filter((data) => {
        return data.month.toLowerCase() === month.toLowerCase();
      });
  
      if (filteredData.length === 0) {
        res.status(404).json({ msg: 'Data not found' });
      } else {
        const formattedData = filteredData.map((data) => {
          return {
            month: data.month,
            employee_name: data.employee_name,
            position: data.employee_position,
            base_salary: data.base_salary,
            transport_allowance: data.transport_allowance,
            meal_allowance: data.meal_allowance,
            deduction: data.deduction,
            total_salary: data.total
          };
        });
        res.json(formattedData);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // View employee salary report by year
  export const viewEmployeeSalaryReportByYear = async (req, res) => {
    try {
      await viewSalaryByYear(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // View employee salary report by name
  export const viewEmployeeSalaryReportByName = async (req, res) => {
    try {
      const salaryData = await getEmployeeSalaryData(req, res);
      const name = req.params.name.toLowerCase();
  
      const foundData = salaryData.filter((data) => {
        const fullName = data.employee_name.toLowerCase();
        const searchKeywords = name.split(" ");
        return searchKeywords.every((keyword) => fullName.includes(keyword));
      });
  
      if (foundData.length === 0) {
        res.status(404).json({ msg: "Data not found" });
      } else {
        res.json(foundData);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  
  // View attendance report by month (dropdown)
  export const viewEmployeeAttendanceByMonth = async (req, res) => {
    try {
      const monthlyAttendanceData = await getAttendanceData();
      const { month } = req.params;
  
      const filteredData = monthlyAttendanceData.filter((record) =>
        record.month.toLowerCase() === month.toLowerCase()
      ).map((record) => {
        return {
          year: record.year,
          month: record.month,
          national_id: record.national_id,
          employee_name: record.employee_name,
          employee_position: record.employee_position,
          present: record.present,
          sick: record.sick,
          absent: record.absent
        };
      });
  
      if (filteredData.length === 0) {
        res.status(404).json({ msg: 'Data not found' });
      } else {
        res.json(filteredData);
      }
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  
  // View attendance report by year
  export const viewEmployeeAttendanceByYear = async (req, res) => {
    try {
      const yearlyAttendanceData = await getAttendanceData();
      const { year } = req.params;
  
      const filteredData = yearlyAttendanceData.filter((record) =>
        record.year.toString() === year.toString()
      ).map((record) => {
        return {
          year: record.year,
          month: record.month,
          national_id: record.national_id,
          employee_name: record.employee_name,
          employee_position: record.employee_position,
          present: record.present,
          sick: record.sick,
          absent: record.absent
        };
      });
  
      if (filteredData.length === 0) {
        res.status(404).json({ msg: 'Data not found' });
      } else {
        res.json(filteredData);
      }
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  
  // View employee salary slip by name
  export const viewSalarySlipByName = async (req, res) => {
    try {
      const salaryData = await getEmployeeSalaryData(req, res);
      const name = req.params.name.toLowerCase();
  
      const foundData = salaryData.filter((data) => {
        const fullName = data.employee_name.toLowerCase();
        const searchKeywords = name.split(" ");
        return searchKeywords.every((keyword) => fullName.includes(keyword));
      });
  
      if (foundData.length === 0) {
        res.status(404).json({ msg: "Data not found" });
      } else {
        res.json(foundData);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  
  // View employee salary slip by month
  export const viewSalarySlipByMonth = async (req, res) => {
    try {
      const { month } = req.params;
      const monthlySalaryData = await getEmployeeSalaryData(req, res);
  
      const filteredData = monthlySalaryData.filter((data) =>
        data.month.toLowerCase() === month.toLowerCase()
      );
  
      if (filteredData.length === 0) {
        res.status(404).json({ msg: `Data for month ${month} not found` });
      } else {
        const formattedData = filteredData.map((data) => {
          return {
            month: data.month,
            year: data.year,
            employee_name: data.employee_name,
            position: data.position,
            base_salary: data.base_salary,
            transport_allowance: data.transport_allowance,
            meal_allowance: data.meal_allowance,
            deduction: data.deduction,
            total_salary: data.total
          };
        });
        res.json(formattedData);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // View employee salary slip by year
  export const viewSalarySlipByYear = async (req, res) => {
    try {
      await viewSalaryByYear(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  