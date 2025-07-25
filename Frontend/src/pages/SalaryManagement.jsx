import { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaFileAlt, FaDownload } from 'react-icons/fa';
import api from '../services/api';

const SalaryManagement = ({ userRole }) => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadData();
  }, [selectedMonth, selectedYear]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [salariesData, employeesData] = await Promise.all([
        api.getAllSalaries(),
        api.getAllEmployees()
      ]);
      setSalaries(salariesData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp._id === employeeId);
    return employee ? employee.employee_name : 'Unknown Employee';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Salary Management</h1>
            <p className="text-gray-600 mt-2">View and manage employee salary information</p>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="form-input"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="form-input"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Position</th>
                  <th>Base Salary</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Month/Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((salary) => (
                  <tr key={salary._id}>
                    <td className="font-medium">{getEmployeeName(salary.employee_id)}</td>
                    <td>{salary.position}</td>
                    <td>${salary.base_salary?.toLocaleString()}</td>
                    <td>${salary.deductions?.toLocaleString() || '0'}</td>
                    <td className="font-semibold">${salary.net_salary?.toLocaleString()}</td>
                    <td>{new Date(salary.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700" title="View Details">
                          <FaMoneyBillWave />
                        </button>
                        <button className="text-green-600 hover:text-green-700" title="Generate Slip">
                          <FaFileAlt />
                        </button>
                        <button className="text-purple-600 hover:text-purple-700" title="Download">
                          <FaDownload />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {salaries.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No salary records found for the selected period</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement; 