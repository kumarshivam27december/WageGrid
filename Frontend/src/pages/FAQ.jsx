import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is the Employee Salary Management System?',
          answer: 'The Employee Salary Management System is a comprehensive HR solution that helps organizations manage employee data, track attendance, calculate salaries, and generate detailed reports. It streamlines all HR processes in one integrated platform.'
        },
        {
          question: 'How secure is my data?',
          answer: 'We implement industry-standard security measures including data encryption, secure authentication, regular backups, and compliance with data protection regulations. Your data is protected with the highest level of security.'
        },
        {
          question: 'Can I access the system from mobile devices?',
          answer: 'Yes, our system is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can access all features from any device with an internet connection.'
        }
      ]
    },
    {
      category: 'Account & Access',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Account creation is typically handled by your organization\'s administrator. Contact your HR department or system administrator to get your login credentials.'
        },
        {
          question: 'I forgot my password. How can I reset it?',
          answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. You\'ll receive an email with instructions to create a new password.'
        },
        {
          question: 'Can I change my password?',
          answer: 'Yes, you can change your password at any time from your profile settings. We recommend changing your password regularly for security.'
        }
      ]
    },
    {
      category: 'Employee Management',
      questions: [
        {
          question: 'How do I add a new employee?',
          answer: 'Only administrators can add new employees. Go to the Employees section and click "Add Employee" to enter the required information including personal details, position, and salary information.'
        },
        {
          question: 'Can I edit employee information?',
          answer: 'Yes, administrators can edit employee information. Navigate to the employee\'s profile and click the edit button to modify any details.'
        },
        {
          question: 'How do I deactivate an employee account?',
          answer: 'Administrators can deactivate employee accounts from the employee management section. This will prevent the employee from accessing the system while preserving their data.'
        }
      ]
    },
    {
      category: 'Attendance & Salary',
      questions: [
        {
          question: 'How do I record attendance?',
          answer: 'Employees can record their attendance through the attendance section. Simply select the date and mark your status (present, absent, late, etc.).'
        },
        {
          question: 'How are salaries calculated?',
          answer: 'Salaries are automatically calculated based on attendance records, base salary, deductions, bonuses, and other factors. The system handles all calculations automatically.'
        },
        {
          question: 'Can I view my salary history?',
          answer: 'Yes, employees can view their salary history in the salary section. You can filter by month or year to see detailed breakdowns.'
        },
        {
          question: 'How do I generate salary slips?',
          answer: 'Salary slips can be generated from the reports section. Select the employee, month, and year to generate a detailed salary slip that can be downloaded as PDF.'
        }
      ]
    },
    {
      category: 'Reports & Analytics',
      questions: [
        {
          question: 'What types of reports are available?',
          answer: 'We offer various reports including attendance reports, salary reports, employee performance reports, and custom analytics. All reports can be filtered by date, department, or other criteria.'
        },
        {
          question: 'Can I export reports?',
          answer: 'Yes, all reports can be exported in multiple formats including PDF, Excel, and CSV for further analysis or sharing.'
        },
        {
          question: 'How often are reports updated?',
          answer: 'Reports are updated in real-time as data is entered into the system. You can view the most current information at any time.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What browsers are supported?',
          answer: 'Our system works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Currently, we offer a responsive web application that works on all devices. A dedicated mobile app is in development and will be available soon.'
        },
        {
          question: 'How can I get technical support?',
          answer: 'You can contact our support team through the contact form, email us at support@esms.com, or call our support line during business hours.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-accent-purple">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our Employee Salary Management System
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-4 py-3 pl-12 border border-accent-purple rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent bg-[#232323] text-gray-200"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card bg-[#232323]">
              <h2 className="text-2xl font-bold text-accent-purple mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const itemIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems.has(itemIndex);
                  
                  return (
                    <div key={questionIndex} className="border border-accent-purple rounded-lg bg-[#232323]">
                      <button
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#28283a] transition-colors"
                        onClick={() => toggleItem(itemIndex)}
                      >
                        <span className="font-medium text-gray-100">{item.question}</span>
                        {isOpen ? (
                          <FaChevronUp className="text-accent-purple" />
                        ) : (
                          <FaChevronDown className="text-accent-purple" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="card text-center bg-[#232323]">
            <h2 className="text-2xl font-bold text-accent-purple mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn btn-primary"
              >
                Contact Support
              </a>
              <a
                href="/help"
                className="btn btn-outline"
              >
                View Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 