import { FaUsers, FaChartLine, FaShieldAlt, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaUsers className="text-3xl text-blue-600" />,
      title: 'People First',
      description: 'We believe in putting people at the center of everything we do, ensuring our solutions enhance human potential.'
    },
    {
      icon: <FaChartLine className="text-3xl text-green-600" />,
      title: 'Innovation',
      description: 'Constantly evolving and improving our technology to meet the changing needs of modern workplaces.'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-purple-600" />,
      title: 'Security',
      description: 'Your data security is our top priority. We implement the highest standards of data protection.'
    },
    {
      icon: <FaLightbulb className="text-3xl text-orange-600" />,
      title: 'Excellence',
      description: 'Committed to delivering excellence in every aspect of our service and product quality.'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://via.placeholder.com/150',
      bio: 'Visionary leader with 15+ years in HR technology.'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://via.placeholder.com/150',
      bio: 'Technology expert specializing in scalable solutions.'
    },
    {
      name: 'Mike Davis',
      role: 'Head of Product',
      image: 'https://via.placeholder.com/150',
      bio: 'Product strategist focused on user experience.'
    },
    {
      name: 'Lisa Chen',
      role: 'Head of Customer Success',
      image: 'https://via.placeholder.com/150',
      bio: 'Dedicated to ensuring customer satisfaction and success.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're passionate about transforming how organizations manage their most valuable asset - their people.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower organizations with innovative HR technology that simplifies employee management, 
                enhances productivity, and fosters a positive workplace culture.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that when HR processes are streamlined and efficient, organizations can focus 
                on what truly matters - growing their business and supporting their employees.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Companies Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-gray-600">Employees Managed</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <span className="text-gray-700">Comprehensive employee management solution</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <span className="text-gray-700">Real-time attendance tracking</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <span className="text-gray-700">Automated salary calculations</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <span className="text-gray-700">Advanced reporting and analytics</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
                    ✓
                  </div>
                  <span className="text-gray-700">Secure and compliant data handling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                Founded in 2020, our journey began with a simple observation: HR processes were 
                unnecessarily complex and time-consuming. We saw an opportunity to create something better.
              </p>
              <p>
                What started as a small team of passionate developers has grown into a comprehensive 
                HR technology company serving hundreds of organizations worldwide.
              </p>
              <p>
                Today, we continue to innovate and evolve, always with our customers' needs at the 
                forefront of everything we do. Our commitment to excellence and customer satisfaction 
                remains unwavering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your HR Management?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of companies that trust us with their employee management needs.
          </p>
          <button className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default About; 