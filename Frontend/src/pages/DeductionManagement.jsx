import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';

const DeductionManagement = () => {
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDeduction, setEditingDeduction] = useState(null);
  const [formData, setFormData] = useState({
    deduction_type: '',
    deduction_amount: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const deductionsData = await api.getAllDeductions();
      setDeductions(deductionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDeduction) {
        await api.updateDeduction(editingDeduction._id, formData);
      } else {
        await api.createDeduction(formData);
      }
      setShowModal(false);
      setEditingDeduction(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving deduction:', error);
    }
  };

  const handleEdit = (deduction) => {
    setEditingDeduction(deduction);
    setFormData({
      deduction_type: deduction.deduction_type || '',
      deduction_amount: deduction.deduction_amount || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deduction?')) {
      try {
        await api.deleteDeduction(id);
        loadData();
      } catch (error) {
        console.error('Error deleting deduction:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      deduction_type: '',
      deduction_amount: ''
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
            <h1 className="text-3xl font-bold text-gray-900">Deduction Management</h1>
            <p className="text-gray-600 mt-2">Manage salary deduction types and amounts</p>
          </div>
          <button
            onClick={() => {
              setEditingDeduction(null);
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" />
            Add Deduction Type
          </button>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Deduction Type</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deductions.map((deduction) => (
                  <tr key={deduction._id}>
                    <td className="font-medium">{deduction.deduction_type}</td>
                    <td className="text-red-600 font-semibold">-${deduction.deduction_amount?.toLocaleString()}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(deduction)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(deduction._id)}
                          className="text-red-600 hover:text-red-700"
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

          {deductions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No deduction types found</p>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingDeduction ? 'Edit Deduction Type' : 'Add New Deduction Type'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="deduction_type" className="form-label">Deduction Type *</label>
                    <input
                      type="text"
                      id="deduction_type"
                      name="deduction_type"
                      required
                      className="form-input"
                      value={formData.deduction_type}
                      onChange={(e) => setFormData({...formData, deduction_type: e.target.value})}
                      placeholder="e.g., Tax, Insurance, Loan"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deduction_amount" className="form-label">Amount *</label>
                    <input
                      type="number"
                      id="deduction_amount"
                      name="deduction_amount"
                      required
                      min="0"
                      step="0.01"
                      className="form-input"
                      value={formData.deduction_amount}
                      onChange={(e) => setFormData({...formData, deduction_amount: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingDeduction(null);
                        resetForm();
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingDeduction ? 'Update Deduction' : 'Add Deduction'}
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

export default DeductionManagement; 