import express from 'express';
import { login, logout, getCurrentUser, changePassword } from "../controllers/Auth.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', getCurrentUser);
router.post('/login', login);
router.delete('/logout', logout);
router.patch('/change_password', verifyUser, changePassword);

export default router;