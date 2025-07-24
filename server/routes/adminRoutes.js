import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { deleteUser, getUsers } from '../controllers/adminController.js';
import { ProtectRoute } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/users', ProtectRoute, isAdmin, getUsers);
router.delete('/users/:id', ProtectRoute, isAdmin, deleteUser);

export default router;