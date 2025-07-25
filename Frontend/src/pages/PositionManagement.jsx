import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';

const PositionManagement = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [formData, setFormData] = useState({
    position_name: '',
    base_salary: '',
    transport_allowance: '',
    meal_allowance: ''
  });

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = async () => {
    try {
      setLoading(true);
      const data = await api.getAllPositions();
      setPositions(data);
    } catch (error) {
      console.error('Error loading positions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        await api.updatePosition(editingPosition._id, formData);
      } else {
        await api.createPosition(formData);
      }
      setShowModal(false);
      setEditingPosition(null);
      resetForm();
      loadPositions();
    } catch (error) {
      console.error('Error saving position:', error);
    }
  };

  const handleEdit = (position) => {
    setEditingPosition(position);
    setFormData({
      position_name: position.position_name || '',
      base_salary: position.base_salary || '',
      transport_allowance: position.transport_allowance || '',
      meal_allowance: position.meal_allowance || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      try {
        await api.deletePosition(id);
        loadPositions();
      } catch (error) {
        console.error('Error deleting position:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      position_name: '',
      base_salary: '',
      transport_allowance: '',
      meal_allowance: ''
    });
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
            <h1 className="text-3xl font-bold text-gray-900">Position Management</h1>
            <p className="text-gray-600 mt-2">Manage job positions and roles</p>
          </div>
          <button
            onClick={() => {
              setEditingPosition(null);
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" />
            Add Position
          </button>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Position Name</th>
                  <th>Base Salary</th>
                  <th>Transport Allowance</th>
                  <th>Meal Allowance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position._id}>
                    <td className="font-medium">{position.position_name}</td>
                    <td>${position.base_salary?.toLocaleString()}</td>
                    <td>${position.transport_allowance?.toLocaleString()}</td>
                    <td>${position.meal_allowance?.toLocaleString() || '0'}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(position)}
                          className="text-blue-600 hover-text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(position._id)}
                          className="text-red-600 hover-text-red-700"
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
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingPosition ? 'Edit Position' : 'Add New Position'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="position_name" className="form-label">Position Name *</label>
                    <input
                      type="text"
                      id="position_name"
                      name="position_name"
                      required
                      className="form-input"
                      value={formData.position_name}
                      onChange={(e) => setFormData({...formData, position_name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="base_salary" className="form-label">Base Salary *</label>
                    <input
                      type="number"
                      id="base_salary"
                      name="base_salary"
                      required
                      className="form-input"
                      value={formData.base_salary}
                      onChange={(e) => setFormData({...formData, base_salary: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="transport_allowance" className="form-label">Transport Allowance *</label>
                    <input
                      type="number"
                      id="transport_allowance"
                      name="transport_allowance"
                      required
                      className="form-input"
                      value={formData.transport_allowance}
                      onChange={(e) => setFormData({...formData, transport_allowance: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="meal_allowance" className="form-label">Meal Allowance</label>
                    <input
                      type="number"
                      id="meal_allowance"
                      name="meal_allowance"
                      className="form-input"
                      value={formData.meal_allowance}
                      onChange={(e) => setFormData({...formData, meal_allowance: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingPosition(null);
                        resetForm();
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingPosition ? 'Update Position' : 'Add Position'}
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

export default PositionManagement; 