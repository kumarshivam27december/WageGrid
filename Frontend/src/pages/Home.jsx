import { Link } from 'react-router-dom';
import { FaUsers, FaChartLine, FaFileAlt, FaShieldAlt, FaClock, FaCalculator } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl text-accent-purple" />,
      title: 'Employee Management',
      description: 'Comprehensive employee data management with detailed profiles and information tracking.'
    },
    {
      icon: <FaClock className="text-4xl text-accent-gold" />,
      title: 'Attendance Tracking',
      description: 'Monitor employee attendance with real-time tracking and automated reporting.'
    },
    {
      icon: <FaCalculator className="text-4xl text-accent-red" />,
      title: 'Salary Management',
      description: 'Automated salary calculations with deductions, bonuses, and tax handling.'
    },
    {
      icon: <FaChartLine className="text-4xl text-accent-orange" />,
      title: 'Advanced Reports',
      description: 'Generate detailed reports for attendance, salary, and performance analytics.'
    },
    {
      icon: <FaFileAlt className="text-4xl text-accent-red" />,
      title: 'Salary Slips',
      description: 'Professional salary slip generation with detailed breakdown and PDF export.'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-accent-purple" />,
      title: 'Secure Access',
      description: 'Role-based access control with secure authentication and data protection.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Employees Managed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '50+', label: 'Companies Trust Us' }
  ];

  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md-text-6xl font-bold mb-6 text-accent-purple">
              Employee Salary Management System
            </h1>
            <p className="text-xl md-text-2xl mb-8 text-gray-400">
              Streamline your HR processes with our comprehensive employee management solution. 
              Track attendance, manage salaries, and generate detailed reports with ease.
            </p>
            <div className="flex flex-col sm-flex-row gap-6 justify-center">
              <Link
                to="/login"
                className="btn text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="btn footer-btn text-lg font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md-grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md-text-5xl font-bold text-accent-purple mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-accent-purple mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to manage your workforce efficiently and effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover-shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-accent-purple mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-accent-purple">
            Ready to Transform Your HR Management?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Join thousands of companies that trust our platform for their employee management needs.
          </p>
          <Link
            to="/login"
            className="btn text-lg font-semibold"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-accent-purple mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-400">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md-grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-accent-purple">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-accent-purple">John Doe</h4>
                  <p className="text-gray-400 text-sm">HR Manager, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-300">
                "This system has revolutionized how we manage our employees. The automated reports save us hours every month."
              </p>
            </div>
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-accent-gold">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-accent-gold">Jane Smith</h4>
                  <p className="text-gray-400 text-sm">CEO, StartupXYZ</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The salary management features are incredible. Everything is automated and accurate."
              </p>
            </div>
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-accent-red">
                  MJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-accent-red">Mike Johnson</h4>
                  <p className="text-gray-400 text-sm">Operations Director, GlobalInc</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Best investment we've made for our HR department. The interface is intuitive and powerful."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 