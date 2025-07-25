import { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaSpinner } from 'react-icons/fa';
import api from '../services/api';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [formData, setFormData] = useState({
    national_id: '',
    employee_name: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    position: '',
    date_joined: '',
    employment_status: 'active',
    role: 'employee'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [employeesData, positionsData] = await Promise.all([
        api.getAllEmployees(),
        api.getAllPositions()
      ]);
      setEmployees(employeesData);
      setPositions(positionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, JPG, or PNG)');
        return;
      }
      
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2 MB');
        return;
      }
      
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        // For editing, don't send password fields
        const { password, confirmPassword, ...updateData } = formData;
        await api.updateEmployee(editingEmployee._id, updateData);
      } else {
        // For creating new employee, photo is required
        if (!photoFile) {
          alert('Please select a photo for the employee');
          return;
        }
        await api.createEmployee(formData, photoFile);
      }
      setShowModal(false);
      setEditingEmployee(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      national_id: employee.national_id || '',
      employee_name: employee.employee_name || '',
      username: employee.username || '',
      password: '',
      confirmPassword: '',
      gender: employee.gender || '',
      position: employee.position || '',
      date_joined: employee.date_joined || '',
      employment_status: employee.employment_status || 'active',
      role: employee.role || 'employee'
    });
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.deleteEmployee(id);
        loadData();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      national_id: '',
      employee_name: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
      position: '',
      date_joined: '',
      employment_status: 'active',
      role: 'employee'
    });
    setPhotoFile(null);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.national_id?.includes(searchTerm)
  );

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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600 mt-2">Manage your organization's employee data</p>
          </div>
          <button
            onClick={() => {
              setEditingEmployee(null);
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary mt-4 md:mt-0"
          >
            <FaPlus className="mr-2" />
            Add Employee
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees by name, username, or NIK..."
                  className="form-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="form-input">
                <option value="">All Positions</option>
                {positions.map(position => (
                  <option key={position._id} value={position.position_name}>
                    {position.position_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>NIK</th>
                  <th>Position</th>
                  <th>Gender</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="font-medium">{employee.employee_name}</td>
                    <td>{employee.username}</td>
                    <td>{employee.national_id}</td>
                    <td>{employee.position}</td>
                    <td>{employee.gender}</td>
                    <td>
                      {employee.date_joined ? new Date(employee.date_joined).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <span className={`badge ${
                        employee.employment_status === 'active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {employee.employment_status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No employees found</p>
            </div>
          )}
        </div>

        {/* Add/Edit Employee Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="employee_name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        id="employee_name"
                        name="employee_name"
                        required
                        className="form-input"
                        value={formData.employee_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="username" className="form-label">Username *</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        className="form-input"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="national_id" className="form-label">NIK *</label>
                      <input
                        type="text"
                        id="national_id"
                        name="national_id"
                        required
                        maxLength="16"
                        className="form-input"
                        value={formData.national_id}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="position" className="form-label">Position *</label>
                      <select
                        id="position"
                        name="position"
                        required
                        className="form-input"
                        value={formData.position}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Position</option>
                        {positions.map(position => (
                          <option key={position._id} value={position.position_name}>
                            {position.position_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="form-label">Gender *</label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        className="form-input"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="date_joined" className="form-label">Join Date *</label>
                      <input
                        type="date"
                        id="date_joined"
                        name="date_joined"
                        required
                        className="form-input"
                        value={formData.date_joined}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="employment_status" className="form-label">Employment Status *</label>
                      <select
                        id="employment_status"
                        name="employment_status"
                        required
                        className="form-input"
                        value={formData.employment_status}
                        onChange={handleInputChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="terminated">Terminated</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="form-label">Role *</label>
                      <select
                        id="role"
                        name="role"
                        required
                        className="form-input"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  
                  {!editingEmployee && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="password" className="form-label">Password *</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            required={!editingEmployee}
                            className="form-input"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required={!editingEmployee}
                            className="form-input"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="photo" className="form-label">Employee Photo *</label>
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          required={!editingEmployee}
                          accept="image/jpeg,image/jpg,image/png"
                          className="form-input"
                          onChange={handlePhotoChange}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Accepted formats: JPEG, JPG, PNG. Max size: 2MB
                        </p>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingEmployee(null);
                        resetForm();
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {editingEmployee ? 'Update Employee' : 'Add Employee'}
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

export default EmployeeManagement; 