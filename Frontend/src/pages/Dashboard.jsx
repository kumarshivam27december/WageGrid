import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaClock, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaFileAlt, 
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import api from '../services/api';

const Dashboard = ({ userRole }) => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendance: 0,
    totalSalaries: 0,
    totalReports: 0
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      if (userRole === 'admin') {
        // Load admin dashboard data
        const [employees, attendance, salaries] = await Promise.all([
          api.getAllEmployees(),
          api.getAllAttendance(),
          api.getAllSalaries()
        ]);

        setStats({
          totalEmployees: employees.length || 0,
          totalAttendance: attendance.length || 0,
          totalSalaries: salaries.length || 0,
          totalReports: 0 // Will be calculated based on available reports
        });

        setRecentEmployees(employees.slice(0, 5) || []);
        setRecentAttendance(attendance.slice(0, 5) || []);
      } else {
        // Load employee dashboard data
        const dashboardData = await api.getEmployeeDashboard();
        setStats({
          totalEmployees: 1,
          totalAttendance: dashboardData.attendanceCount || 0,
          totalSalaries: dashboardData.salaryCount || 0,
          totalReports: 0
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: <FaUsers className="text-3xl text-blue-600" />,
      color: 'bg-blue-50',
      link: userRole === 'admin' ? '/employees' : null
    },
    {
      title: 'Attendance Records',
      value: stats.totalAttendance,
      icon: <FaClock className="text-3xl text-green-600" />,
      color: 'bg-green-50',
      link: '/attendance'
    },
    {
      title: 'Salary Records',
      value: stats.totalSalaries,
      icon: <FaMoneyBillWave className="text-3xl text-purple-600" />,
      color: 'bg-purple-50',
      link: '/salaries'
    },
    {
      title: 'Reports Generated',
      value: stats.totalReports,
      icon: <FaChartLine className="text-3xl text-orange-600" />,
      color: 'bg-orange-50',
      link: userRole === 'admin' ? '/reports' : null
    }
  ];

  const quickActions = [
    {
      title: 'Add Employee',
      icon: <FaPlus />,
      link: '/employees',
      color: 'bg-blue-600 hover:bg-blue-700',
      adminOnly: true
    },
    {
      title: 'Record Attendance',
      icon: <FaClock />,
      link: '/attendance',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'View Salaries',
      icon: <FaMoneyBillWave />,
      link: '/salaries',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Generate Reports',
      icon: <FaFileAlt />,
      link: '/reports',
      color: 'bg-orange-600 hover:bg-orange-700',
      adminOnly: true
    }
  ];

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userRole === 'admin' ? 'Administrator' : 'Employee'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your {userRole === 'admin' ? 'organization' : 'account'} today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className={`card ${stat.color} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div>{stat.icon}</div>
              </div>
              {stat.link && (
                <Link 
                  to={stat.link}
                  className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  View details
                  <FaEye className="ml-1" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              action.adminOnly && userRole !== 'admin' ? null : (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-4 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                >
                  {action.icon}
                  <span className="font-medium">{action.title}</span>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Recent Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Employees (Admin Only) */}
          {userRole === 'admin' && recentEmployees.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Employees</h2>
                <Link to="/employees" className="text-blue-600 hover:text-blue-700 text-sm">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {recentEmployees.map((employee) => (
                  <div key={employee._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/employees/${employee._id}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/employees/${employee._id}/edit`}
                        className="text-green-600 hover:text-green-700"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Attendance */}
          {recentAttendance.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Attendance</h2>
                <Link to="/attendance" className="text-blue-600 hover:text-blue-700 text-sm">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {recentAttendance.map((attendance) => (
                  <div key={attendance._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{attendance.employeeName}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(attendance.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`badge ${attendance.status === 'present' ? 'badge-success' : 'badge-warning'}`}>
                        {attendance.status}
                      </span>
                      {userRole === 'admin' && (
                        <Link
                          to={`/attendance/${attendance._id}/edit`}
                          className="text-green-600 hover:text-green-700"
                        >
                          <FaEdit />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* System Status */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Database Connected</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">All Services Running</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 