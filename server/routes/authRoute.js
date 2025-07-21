import express from 'express';
const router = express.Router();
import {login, signin} from '../controllers/authController.js';
import { validateSignin } from '../middleware/validators.js';

router.post('/signin', validateSignin, signin);
router.post('/login', login);

export default router;