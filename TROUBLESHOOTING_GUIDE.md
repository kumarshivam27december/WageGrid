# Database Connection Issues - Troubleshooting Guide

## Issues Identified

You're experiencing problems with your application after migrating from MongoDB Compass to MongoDB Atlas. The main issues are:

1. **0 employees showing** despite having data in Atlas
2. **Empty position select options** in the add employee form
3. **Backend deployed on Render, Frontend on Netlify**

## Root Causes Found

### 1. Database Connection Configuration Issues
- **Double database connections**: Your app was creating two separate mongoose connections
- **Unused Database.js file**: Created confusion and potential connection conflicts
- **Model binding issues**: Models weren't properly associated with the main connection

### 2. Authentication & Middleware Issues
- **Session handling**: Potential issues with session storage in production
- **CORS configuration**: May need updates for production domains

### 3. Environment Variables
- **Missing or incorrect MongoDB Atlas URI** in production environment
- **Session secret not properly configured**

## Fixes Applied

### 1. ✅ Fixed Database Models
- Updated `employeemodel.js` and `positionmodel.js` to use proper mongoose connection
- Added timestamps for better tracking
- Removed unused `Database.js` file

### 2. ✅ Enhanced Logging
- Added comprehensive logging to controllers
- Database connection state monitoring
- Better error reporting

### 3. ✅ Fixed Server Configuration
- Consolidated to single MongoDB connection
- Added health check endpoint `/health`
- Enhanced connection logging

### 4. ✅ Added Testing Tools
- Created `testConnection.js` script to verify database connectivity
- Added `npm run test-db` command

## Next Steps - Action Required

### 1. **Update Environment Variables on Render**

Your Render backend needs these environment variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
SESS_SECRET=your-secret-key-here
APP_PORT=5000
```

**How to update on Render:**
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add/update the `MONGO_URI` with your Atlas connection string
5. Ensure `SESS_SECRET` is set to a secure random string
6. Save and redeploy

### 2. **Verify MongoDB Atlas Configuration**

Check your Atlas setup:
1. **Database Name**: Ensure it matches what you had in Compass
2. **Collection Names**: Should be `employees` and `positions`
3. **Network Access**: Whitelist `0.0.0.0/0` for Render access
4. **Database User**: Ensure user has read/write permissions

### 3. **Test Database Connection**

Run this test locally first:
```bash
cd Backend
npm run test-db
```

This will show you:
- If connection works
- How many employees/positions are in the database
- Available collections
- Sample data

### 4. **Check Production Logs**

On Render:
1. Go to your service logs
2. Look for these messages:
   - "Connected to MongoDB Atlas"
   - Database connection state logs
   - Any error messages

### 5. **Verify Data Migration**

Ensure your data was properly migrated to Atlas:
1. **Check Collection Names**: They should be exactly `employees` and `positions`
2. **Verify Data Structure**: Documents should have all required fields
3. **Test a few records**: Manually verify some employee and position records

## Common Atlas Migration Issues

### Collection Name Mismatch
If your Atlas collections have different names:
- Update collection names in the model files
- Or rename collections in Atlas to match the code

### Data Structure Changes
Ensure all required fields exist:
- `employee_id`, `national_id`, `employee_name`, `role`, etc.
- `position_id`, `position_name`, `base_salary`, etc.

### Connection String Format
Atlas connection strings must include:
- Correct username and password
- Cluster URL
- Database name
- Connection options

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/employee_management?retryWrites=true&w=majority
```

## Testing Steps

1. **Local Test**: Run `npm run test-db` in Backend directory
2. **Health Check**: Visit `https://wagegrid.onrender.com/health`
3. **API Test**: Try `https://wagegrid.onrender.com/api/employees` (after login)
4. **Frontend Test**: Login and check if employees appear

## If Issues Persist

Check these in order:

1. **Environment Variables**: Verify `MONGO_URI` in Render
2. **Network Access**: Ensure Atlas allows connections from anywhere
3. **Database Permissions**: User has readWrite access
4. **Collection Names**: Exactly match the model definitions
5. **Data Format**: Documents have all required fields

## Quick Fix Commands

```bash
# Test database connection locally
npm run test-db

# Check logs in development
npm start

# Health check
curl https://wagegrid.onrender.com/health
```

The fixes I've implemented should resolve the main database connection issues. The key is ensuring your production environment variables are correctly set with your MongoDB Atlas connection string.