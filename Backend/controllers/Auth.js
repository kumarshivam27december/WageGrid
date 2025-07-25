import Employee from "../models/employeemodel.js";
import argon2 from "argon2";
import { verifyUser } from "../middleware/AuthUser.js";

export const login = async (req, res) => {
  console.log('login called, body:', req.body, 'session:', req.session);
  let user = {};
  const employee = await Employee.findOne({
    username: req.body.username
  });

  if (!employee) {
    return res.status(404).json({ msg: "Employee data not found" });
  }

  const isMatch = await argon2.verify(employee.password, req.body.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Incorrect password" });
  }

  req.session.userId = employee.employee_id;

  user = {
    employee_id: employee._id,
    employee_name: employee.employee_name,
    username: employee.username,
    role: employee.role
  };

  res.status(200).json({
    employee_id: user.employee_id,
    employee_name: user.employee_name,
    username: user.username,
    role: user.role,
    msg: "Login successful"
  });
};

export const getCurrentUser = async (req, res) => {
  console.log('getCurrentUser called, session:', req.session);
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }

  const employee = await Employee.findOne({
    employee_id: req.session.userId
  }).select("employee_id national_id employee_name username role");

  if (!employee) return res.status(404).json({ msg: "User not found" });

  res.status(200).json(employee);
};

export const logout = (req, res) => {
  console.log('logout called, session:', req.session);
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Failed to logout" });
    res.status(200).json({ msg: "You have successfully logged out" });
  });
};

export const changePassword = async (req, res) => {
  console.log('changePassword called, userId:', req.userId, 'body:', req.body);
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const employee = await Employee.findById(userId);
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Password and confirmation password do not match" });
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
