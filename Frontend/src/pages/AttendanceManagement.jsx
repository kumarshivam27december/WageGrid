import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCalendar } from 'react-icons/fa';
import api from '../services/api';

const AttendanceManagement = ({ userRole }) => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [formData, setFormData] = useState({
    employee_nik: '',
    employee_name: '',
    gender: '',
    position_name: '',
    present_days: 0,
    sick_days: 0,
    absent_days: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attendanceData, employeesData] = await Promise.all([
        api.getAllAttendance(),
        api.getAllEmployees()
      ]);
      setAttendance(attendanceData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAttendance) {
        await api.updateAttendance(editingAttendance._id, formData);
      } else {
        await api.createAttendance(formData);
      }
      setShowModal(false);
      setEditingAttendance(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const handleEdit = (attendance) => {
    setEditingAttendance(attendance);
    setFormData({
      employee_nik: attendance.employee_nik || '',
      employee_name: attendance.employee_name || '',
      gender: attendance.gender || '',
      position_name: attendance.position_name || '',
      present_days: attendance.present_days || 0,
      sick_days: attendance.sick_days || 0,
      absent_days: attendance.absent_days || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await api.deleteAttendance(id);
        loadData();
      } catch (error) {
        console.error('Error deleting attendance:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employee_nik: '',
      employee_name: '',
      gender: '',
      position_name: '',
      present_days: 0,
      sick_days: 0,
      absent_days: 0
    });
  };

  const handleEmployeeChange = (employeeId) => {
    const employee = employees.find(emp => emp._id === employeeId);
    if (employee) {
      setFormData({
        ...formData,
        employee_nik: employee.national_id,
        employee_name: employee.employee_name,
        gender: employee.gender,
        position_name: employee.position
      });
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-2">Track employee attendance and time records</p>
          </div>
          <button
            onClick={() => {
              setEditingAttendance(null);
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" />
            Record Attendance
          </button>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>NIK</th>
                  <th>Position</th>
                  <th>Present Days</th>
                  <th>Sick Days</th>
                  <th>Absent Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>
                    <td className="font-medium">{record.employee_name}</td>
                    <td>{record.employee_nik}</td>
                    <td>{record.position_name}</td>
                    <td className="text-green-600 font-semibold">{record.present_days || 0}</td>
                    <td className="text-yellow-600 font-semibold">{record.sick_days || 0}</td>
                    <td className="text-red-600 font-semibold">{record.absent_days || 0}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        {userRole === 'admin' && (
                          <button
                            onClick={() => handleDelete(record._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {attendance.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No attendance records found</p>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingAttendance ? 'Edit Attendance' : 'Record Attendance'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="employee_id" className="form-label">Employee *</label>
                    <select
                      id="employee_id"
                      name="employee_id"
                      required
                      className="form-input"
                      onChange={(e) => handleEmployeeChange(e.target.value)}
                    >
                      <option value="">Select Employee</option>
                      {employees.map(employee => (
                        <option key={employee._id} value={employee._id}>
                          {employee.employee_name} - {employee.national_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="present_days" className="form-label">Present Days *</label>
                    <input
                      type="number"
                      id="present_days"
                      name="present_days"
                      required
                      min="0"
                      max="31"
                      className="form-input"
                      value={formData.present_days}
                      onChange={(e) => setFormData({...formData, present_days: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sick_days" className="form-label">Sick Days</label>
                    <input
                      type="number"
                      id="sick_days"
                      name="sick_days"
                      min="0"
                      max="31"
                      className="form-input"
                      value={formData.sick_days}
                      onChange={(e) => setFormData({...formData, sick_days: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="absent_days" className="form-label">Absent Days</label>
                    <input
                      type="number"
                      id="absent_days"
                      name="absent_days"
                      min="0"
                      max="31"
                      className="form-input"
                      value={formData.absent_days}
                      onChange={(e) => setFormData({...formData, absent_days: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingAttendance(null);
                        resetForm();
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingAttendance ? 'Update Attendance' : 'Record Attendance'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement; 