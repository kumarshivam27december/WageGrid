import express from 'express';
import { getAllPositions, getPositionById, createPosition, updatePosition, deletePosition } from '../controllers/jobdata.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

// Get all positions
router.get('/', verifyUser, getAllPositions);

// Get a position by ID
router.get('/:id', verifyUser, getPositionById);

// Create a new position
router.post('/', adminOnly, createPosition);

// Update a position
router.put('/:id', adminOnly, updatePosition);

// Delete a position
router.delete('/:id', adminOnly, deletePosition);

export default router;
