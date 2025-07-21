import express from 'express';
const router = express.Router();
import {login, signin} from '../controllers/authController.js';
import { validateLogin, validateSignin } from '../middleware/validators.js';

router.post('/signin', validateSignin, signin);
router.post('/login', validateLogin, login);

export default router;