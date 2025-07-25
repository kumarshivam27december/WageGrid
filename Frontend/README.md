# Employee Salary Management System - Frontend

A modern React frontend for the Employee Salary Management System built with Vite.

## Features

- **Modern UI/UX**: Clean, responsive design with modern styling
- **Authentication**: Secure login/logout functionality
- **Role-based Access**: Different views for admin and employee users
- **Employee Management**: Full CRUD operations for employee data
- **Position Management**: Manage job positions and roles
- **Attendance Tracking**: Record and manage employee attendance
- **Salary Management**: View and manage salary information
- **Deduction Management**: Handle salary deductions and adjustments
- **Reports & Analytics**: Generate comprehensive reports
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Pages

### Public Pages
- **Home**: Landing page with features and testimonials
- **About**: Company information and team details
- **Contact**: Contact form and company information
- **FAQ**: Frequently asked questions
- **Terms**: Terms and conditions
- **Help**: Support and documentation

### Protected Pages (Requires Login)
- **Dashboard**: Overview with statistics and quick actions
- **Employee Management**: Add, edit, delete employees (Admin only)
- **Position Management**: Manage job positions (Admin only)
- **Attendance Management**: Track attendance records
- **Salary Management**: View salary information
- **Deduction Management**: Manage salary deductions (Admin only)
- **Reports**: Generate reports and analytics (Admin only)

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **React Icons**: Icon library
- **CSS**: Custom CSS with utility classes (Tailwind-inspired)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `https://wagegrid.onrender.com`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The frontend communicates with the backend through the API service located at `src/services/api.js`. All API calls include:

- Proper error handling
- Authentication headers
- CORS support
- Session management

## Authentication

The system supports two user roles:

- **Admin**: Full access to all features
- **Employee**: Limited access to personal data and attendance

### Demo Credentials

- **Admin**: admin@example.com / admin123
- **Employee**: employee@example.com / employee123

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── Footer.jsx      # Footer component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Authentication
│   ├── Dashboard.jsx   # Main dashboard
│   └── ...             # Other pages
├── services/           # API and utility services
│   └── api.js         # API service
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── App.css            # Global styles
```

## Styling

The application uses custom CSS with utility classes inspired by Tailwind CSS. Key features:

- Responsive design
- Modern color scheme
- Consistent spacing
- Interactive hover states
- Loading animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
