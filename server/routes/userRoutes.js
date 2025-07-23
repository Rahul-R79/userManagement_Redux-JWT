import express from 'express';
import { verifyToken } from '../utils/jwt.js';
import {getUserProfile, updateUserProfile} from '../controllers/userController.js';
import upload from '../utils/cloudinaryStorage.js';
const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, upload.single('image'), updateUserProfile);

export default router;