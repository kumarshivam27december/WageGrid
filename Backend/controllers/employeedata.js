import Employee from "../models/employeemodel.js";
import argon2 from "argon2";
import path from "path";

// Display all employee data
export const getAllEmployees = async (req, res) => {
  console.log('getAllEmployees called');
  try {
    console.log('Querying Employee.find()...');
    const response = await Employee.find().select(
      'employee_id national_id employee_name gender position date_joined employment_status photo role'
    );
    console.log('Employee.find() returned:', response.length, 'employees');
    res.status(200).json(response);
  } catch (error) {
    console.error('getAllEmployees error:', error);
    res.status(500).json({ msg: error.message });
  }
};

// Get employee by ID
export const getEmployeeByID = async (req, res) => {
  console.log('getEmployeeByID called, params:', req.params);
  try {
    const response = await Employee.findById(req.params.id).select(
      'employee_id national_id employee_name gender position username date_joined employment_status photo role'
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: 'Employee data with that ID not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get employee by NIK
export const getEmployeeByNationalID = async (req, res) => {
  console.log('getEmployeeByNationalID called, params:', req.params);
  try {
    const response = await Employee.findOne({ national_id: req.params.nik }).select(
      'employee_id national_id employee_name gender position date_joined employment_status photo role'
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: 'Employee data with that NIK not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get employee by name
export const getEmployeeByName = async (req, res) => {
  console.log('getEmployeeByName called, params:', req.params);
  try {
    const response = await Employee.findOne({ employee_name: req.params.name }).select(
      'employee_id national_id employee_name gender position date_joined employment_status photo role'
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: 'Employee data with that name not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create new employee
export const createEmployee = async (req, res) => {
  console.log('createEmployee called, body:', req.body, 'files:', req.files);
  const {
    national_id,
    employee_name,
    username,
    password,
    confirmPassword,
    gender,
    position,
    date_joined,
    employment_status,
    role
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password and confirmation password do not match" });
  }

  if (!req.files || !req.files.photo) {
    return res.status(400).json({ msg: "Photo upload failed. Please try uploading again" });
  }

  const file = req.files.photo;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedTypes = ['.png', '.jpg', '.jpeg'];

  if (!allowedTypes.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Invalid photo file format" });
  }

  if (fileSize > 2000000) {
    return res.status(422).json({ msg: "Image size must be less than 2 MB" });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    const hashedPassword = await argon2.hash(password);

    try {
      await Employee.create({
        national_id: national_id,
        employee_name: employee_name,
        username: username,
        password: hashedPassword,
        gender: gender,
        position: position,
        date_joined: date_joined,
        employment_status: employment_status,
        photo: fileName,
        url: url,
        role: role
      });

      res.status(201).json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// Update employee data
export const updateEmployee = async (req, res) => {
  console.log('updateEmployee called, params:', req.params, 'body:', req.body);
  const employee = await Employee.findById(req.params.id);

  if (!employee) return res.status(404).json({ msg: "Employee data not found" });

  const {
    national_id,
    employee_name,
    username,
    gender,
    position,
    date_joined,
    employment_status,
    role
  } = req.body;

  try {
    await Employee.findByIdAndUpdate(employee._id, {
      national_id,
      employee_name,
      username,
      gender,
      position,
      date_joined,
      employment_status,
      role
    });

    res.status(200).json({ msg: "Employee data updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update employee password (admin action)
export const changeEmployeePasswordByAdmin = async (req, res) => {
  console.log('changeEmployeePasswordByAdmin called, params:', req.params, 'body:', req.body);
  const employee = await Employee.findById(req.params.id);

  if (!employee) return res.status(404).json({ msg: "Employee data not found" });

  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password and confirmation password do not match" });
  }

  try {
    const hashedPassword = await argon2.hash(password);
    await Employee.findByIdAndUpdate(employee._id, {
      password: hashedPassword
    });

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  console.log('deleteEmployee called, params:', req.params);
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: "Employee data not found" });

    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
