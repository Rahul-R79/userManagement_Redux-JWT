import express from 'express';
const router = express.Router();
import {signin} from '../controllers/authController.js';
import { validateSignin } from '../middleware/validators.js';

router.post('/signin', validateSignin, signin);

export default router;