import { FaBook, FaVideo, FaHeadset, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';

const Help = () => {
  const helpCategories = [
    {
      icon: <FaBook className="text-3xl text-blue-600" />,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials to help you get started and master all features.',
      link: '#',
      color: 'bg-blue-50'
    },
    {
      icon: <FaVideo className="text-3xl text-green-600" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides covering all aspects of the system.',
      link: '#',
      color: 'bg-green-50'
    },
    {
      icon: <FaHeadset className="text-3xl text-purple-600" />,
      title: 'Live Support',
      description: 'Get real-time help from our support team during business hours.',
      link: '#',
      color: 'bg-purple-50'
    },
    {
      icon: <FaEnvelope className="text-3xl text-orange-600" />,
      title: 'Email Support',
      description: 'Send us detailed questions and get comprehensive responses.',
      link: '/contact',
      color: 'bg-orange-50'
    }
  ];

  const quickGuides = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using the Employee Salary Management System',
      steps: [
        'Create your account',
        'Set up your profile',
        'Add your first employee',
        'Record attendance',
        'Generate your first report'
      ]
    },
    {
      title: 'Employee Management',
      description: 'How to add, edit, and manage employee information',
      steps: [
        'Navigate to Employees section',
        'Click "Add Employee"',
        'Fill in required information',
        'Save and verify details',
        'Set up access permissions'
      ]
    },
    {
      title: 'Attendance Tracking',
      description: 'Recording and managing employee attendance',
      steps: [
        'Go to Attendance section',
        'Select employee and date',
        'Mark attendance status',
        'Add notes if needed',
        'Save attendance record'
      ]
    },
    {
      title: 'Salary Management',
      description: 'Managing salary calculations and deductions',
      steps: [
        'Access Salary section',
        'Review salary components',
        'Add deductions if needed',
        'Calculate final salary',
        'Generate salary slip'
      ]
    }
  ];

  const supportChannels = [
    {
      icon: <FaPhone className="text-2xl text-blue-600" />,
      title: 'Phone Support',
      details: ['+1 (555) 123-4567', 'Monday - Friday: 9:00 AM - 6:00 PM EST'],
      action: 'Call Now',
      link: 'tel:+15551234567'
    },
    {
      icon: <FaEnvelope className="text-2xl text-green-600" />,
      title: 'Email Support',
      details: ['support@esms.com', 'Response within 24 hours'],
      action: 'Send Email',
      link: 'mailto:support@esms.com'
    },
    {
      icon: <FaComments className="text-2xl text-purple-600" />,
      title: 'Live Chat',
      details: ['Available during business hours', 'Instant responses'],
      action: 'Start Chat',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Help & Support</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to help you get the most out of our Employee Salary Management System
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How Can We Help You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <div key={index} className={`card ${category.color} hover:shadow-lg transition-shadow`}>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <a
                    href={category.link}
                    className="btn btn-primary"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Quick Start Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickGuides.map((guide, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {guide.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {guide.description}
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Support Channels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {channel.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {channel.title}
                </h3>
                <div className="space-y-2 mb-6">
                  {channel.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <a
                  href={channel.link}
                  className="btn btn-primary"
                >
                  {channel.action}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="card text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">
              Find quick answers to common questions about our system
            </p>
            <a
              href="/faq"
              className="btn btn-primary"
            >
              View FAQ
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Still Need Help?</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="form-input"
                  >
                    <option value="">Select a topic</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    className="form-input"
                    placeholder="Describe your issue or question in detail..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 text-lg font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help; 