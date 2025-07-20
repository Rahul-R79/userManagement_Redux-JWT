import express from 'express';
const router = express.Router();
import {signup} from '../controllers/authController.js';

router.post('/signin', signup);

export default router;