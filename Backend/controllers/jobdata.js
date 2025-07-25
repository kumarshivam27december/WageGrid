import mongoose from 'mongoose';
import Position from "../models/positionmodel.js";
import Employee from "../models/employeemodel.js";

// Display all position data
export const getAllPositions = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Position.find().select(
        "position_id position_name base_salary transport_allowance meal_allowance user_id"
      );
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get position data by ID
export const getPositionById = async (req, res) => {
  try {
    const response = await Position.findById(req.params.id).select(
      "position_id position_name base_salary transport_allowance meal_allowance user_id"
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ msg: "Position data with that ID not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create new position
export const createPosition = async (req, res) => {
  const {
    position_name,
    base_salary,
    transport_allowance,
    meal_allowance
  } = req.body;

  try {
    if (req.role === "admin") {
      await Position.create({
        position_id: new mongoose.Types.ObjectId().toString(),
        position_name,
        base_salary: Number(base_salary),
        transport_allowance: Number(transport_allowance),
        meal_allowance: meal_allowance ? Number(meal_allowance) : 0,
        user_id: req.userId
      });
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }
    res.status(201).json({ success: true, message: "Position saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update position data
export const updatePosition = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) return res.status(404).json({ msg: "Data not found" });

    const { position_name, base_salary, transport_allowance, meal_allowance } = req.body;

    if (req.role === "admin") {
      await Position.findByIdAndUpdate(position._id, {
        position_name,
        base_salary: Number(base_salary),
        transport_allowance: Number(transport_allowance),
        meal_allowance: meal_allowance ? Number(meal_allowance) : 0
      });
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.status(200).json({ msg: "Position updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete position data
export const deletePosition = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) return res.status(404).json({ msg: "Data not found" });

    if (req.role === "admin") {
      await Position.findByIdAndDelete(position._id);
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.status(200).json({ msg: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
