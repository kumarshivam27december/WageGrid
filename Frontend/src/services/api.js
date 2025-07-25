const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      credentials: 'include',
      headers: {
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(credentials) {
    return this.request('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/logout', {
      method: 'DELETE',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async changePassword(passwords) {
    return this.request('/change_password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwords),
    });
  }

  // Employee Management
  async getAllEmployees() {
    return this.request('/employees');
  }

  async getEmployeeById(id) {
    return this.request(`/employees/id/${id}`);
  }

  async getEmployeeByNationalID(nik) {
    return this.request(`/employees/nik/${nik}`);
  }

  async getEmployeeByName(name) {
    return this.request(`/employees/name/${name}`);
  }

  async createEmployee(employeeData, photoFile) {
    const formData = new FormData();
    
    // Add all employee data to FormData
    Object.keys(employeeData).forEach(key => {
      formData.append(key, employeeData[key]);
    });
    
    // Add photo file
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    return this.request('/employees', {
      method: 'POST',
      body: formData,
    });
  }

  async updateEmployee(id, employeeData) {
    return this.request(`/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
  }

  async deleteEmployee(id) {
    return this.request(`/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // Position Management
  async getAllPositions() {
    return this.request('/positions');
  }

  async getPositionById(id) {
    return this.request(`/positions/${id}`);
  }

  async createPosition(positionData) {
    return this.request('/positions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(positionData),
    });
  }

  async updatePosition(id, positionData) {
    return this.request(`/positions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(positionData),
    });
  }

  async deletePosition(id) {
    return this.request(`/positions/${id}`, {
      method: 'DELETE',
    });
  }

  // Attendance Management
  async getAllAttendance() {
    return this.request('/attendance');
  }

  async getAttendanceById(id) {
    return this.request(`/attendance/${id}`);
  }

  async createAttendance(attendanceData) {
    return this.request('/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });
  }

  async updateAttendance(id, attendanceData) {
    return this.request(`/attendance/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });
  }

  async deleteAttendance(id) {
    return this.request(`/attendance/${id}`, {
      method: 'DELETE',
    });
  }

  // Salary Management
  async getAllSalaries() {
    return this.request('/salaries');
  }

  async getSalaryByName(name) {
    return this.request(`/salaries/name/${name}`);
  }

  async getSalaryByMonth(month) {
    return this.request(`/salaries/month/${month}`);
  }

  async getSalaryByYear(year) {
    return this.request(`/salaries/year/${year}`);
  }

  // Deduction Management
  async getAllDeductions() {
    return this.request('/deductions');
  }

  async getDeductionById(id) {
    return this.request(`/deductions/${id}`);
  }

  async createDeduction(deductionData) {
    return this.request('/deductions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deductionData),
    });
  }

  async updateDeduction(id, deductionData) {
    return this.request(`/deductions/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deductionData),
    });
  }

  async deleteDeduction(id) {
    return this.request(`/deductions/${id}`, {
      method: 'DELETE',
    });
  }

  // Reports
  async getSalaryReport() {
    return this.request('/reports/salary');
  }

  async getSalaryReportByName(name) {
    return this.request(`/reports/salary/name/${name}`);
  }

  async getSalaryReportByMonth(month) {
    return this.request(`/reports/salary/month/${month}`);
  }

  async getSalaryReportByYear(year) {
    return this.request(`/reports/salary/year/${year}`);
  }

  async getAttendanceReportByMonth(month) {
    return this.request(`/reports/attendance/month/${month}`);
  }

  async getAttendanceReportByYear(year) {
    return this.request(`/reports/attendance/year/${year}`);
  }

  // Salary Slip
  async getSalarySlipByName(name) {
    return this.request(`/salary-slip/name/${name}`);
  }

  async getSalarySlipByMonth(month) {
    return this.request(`/salary-slip/month/${month}`);
  }

  async getSalarySlipByYear(year) {
    return this.request(`/salary-slip/year/${year}`);
  }

  // Employee Dashboard
  async getEmployeeDashboard() {
    return this.request('/dashboard');
  }

  async getEmployeeSalaryByMonth(month) {
    return this.request(`/salary/month/${month}`);
  }

  async getEmployeeSalaryByYear(year) {
    return this.request(`/salary/year/${year}`);
  }
}

const api = new ApiService();
export default api; 