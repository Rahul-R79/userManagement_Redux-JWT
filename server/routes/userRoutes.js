//user profile route

import express from 'express';
import {getUserProfile, updateUserProfile} from '../controllers/userController.js';
import upload from '../utils/cloudinaryStorage.js';
import { ProtectRoute } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/profile', ProtectRoute, getUserProfile);
router.put('/profile', ProtectRoute, upload.single('image'), updateUserProfile);

export default router;