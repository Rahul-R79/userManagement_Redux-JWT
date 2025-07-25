import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { deleteUser, getUsers, searchUser } from '../controllers/adminController.js';
import { ProtectRoute } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/users', ProtectRoute, isAdmin, getUsers);
router.delete('/users/:id', ProtectRoute, isAdmin, deleteUser);
router.get('/search-users', ProtectRoute, isAdmin, searchUser);

export default router;