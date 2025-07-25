import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, userRole, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
    { to: '/terms', label: 'Terms' },
    { to: '/help', label: 'Help' },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/employees', label: 'Employees' },
    { to: '/positions', label: 'Positions' },
    { to: '/attendance', label: 'Attendance' },
    { to: '/salaries', label: 'Salaries' },
    { to: '/deductions', label: 'Deductions' },
    { to: '/reports', label: 'Reports' },
  ];

  const employeeLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/attendance', label: 'Attendance' },
    { to: '/salaries', label: 'My Salary' },
  ];

  const getNavLinks = () => {
    if (!isAuthenticated) return publicLinks;
    return userRole === 'admin' ? adminLinks : employeeLinks;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ES</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Employee Salary Management
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md-flex items-center space-x-8">
            {getNavLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover-text-blue-600 hover-bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md-flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {userRole === 'admin' ? 'Admin' : 'Employee'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover-text-red-700 hover-bg-red-50 rounded-md transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md-hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover-text-blue-600 focus-outline-none focus-text-blue-600"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm-px-3 bg-white border-t border-gray-200">
              {getNavLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover-text-blue-600 hover-bg-blue-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-700">
                      <FaUser className="inline mr-2" />
                      {userRole === 'admin' ? 'Admin' : 'Employee'}
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover-text-red-700 hover-bg-red-50 rounded-md transition-colors"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-blue-600 hover-text-blue-700 hover-bg-blue-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 