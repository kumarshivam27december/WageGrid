import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Help from './pages/Help';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import PositionManagement from './pages/PositionManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import SalaryManagement from './pages/SalaryManagement';
import DeductionManagement from './pages/DeductionManagement';
import Reports from './pages/Reports';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUserRole(userData.role);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUserRole(null);
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
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userRole={userRole} 
          onLogout={handleLogout}
        />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<Help />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard userRole={userRole} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/employees" 
              element={
                isAuthenticated && userRole === 'admin' ? 
                <EmployeeManagement /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/positions" 
              element={
                isAuthenticated && userRole === 'admin' ? 
                <PositionManagement /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/attendance" 
              element={
                isAuthenticated ? 
                <AttendanceManagement userRole={userRole} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/salaries" 
              element={
                isAuthenticated ? 
                <SalaryManagement userRole={userRole} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/deductions" 
              element={
                isAuthenticated && userRole === 'admin' ? 
                <DeductionManagement /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/reports" 
              element={
                isAuthenticated && userRole === 'admin' ? 
                <Reports /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
