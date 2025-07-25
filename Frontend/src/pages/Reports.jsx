import { useState, useEffect } from 'react';
import { FaFileAlt, FaDownload, FaChartLine, FaUsers, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import api from '../services/api';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState('salary');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const reportTypes = [
    {
      id: 'salary',
      name: 'Salary Reports',
      icon: <FaMoneyBillWave className="text-2xl text-blue-600" />,
      description: 'Generate salary reports by employee, month, or year'
    },
    {
      id: 'attendance',
      name: 'Attendance Reports',
      icon: <FaClock className="text-2xl text-green-600" />,
      description: 'View attendance statistics and patterns'
    },
    {
      id: 'employee',
      name: 'Employee Reports',
      icon: <FaUsers className="text-2xl text-purple-600" />,
      description: 'Employee performance and statistics'
    },
    {
      id: 'salary-slip',
      name: 'Salary Slips',
      icon: <FaFileAlt className="text-2xl text-orange-600" />,
      description: 'Generate individual salary slips'
    }
  ];

  const generateReport = async () => {
    setLoading(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Generating ${selectedReport} report for ${selectedMonth}/${selectedYear}`);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive reports and analytics</p>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className={`card cursor-pointer transition-all ${
                selectedReport === report.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {report.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {report.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {report.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Report Configuration */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Generate {reportTypes.find(r => r.id === selectedReport)?.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="form-label">Report Type</label>
              <select
                className="form-input"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                {reportTypes.map(report => (
                  <option key={report.id} value={report.id}>
                    {report.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Month</label>
              <select
                className="form-input"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Year</label>
              <select
                className="form-input"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
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
          
          <div className="flex gap-4">
            <button
              onClick={generateReport}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <div className="spinner mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FaChartLine className="mr-2" />
                  Generate Report
                </>
              )}
            </button>
            
            <button className="btn btn-outline">
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Preview</h2>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Select a report type and click "Generate Report" to view the preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 