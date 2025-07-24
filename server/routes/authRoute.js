import express from 'express';
const router = express.Router();
import {login, signin, logout} from '../controllers/authController.js';
import { validateLogin, validateSignup } from '../middleware/validators.js';

router.post('/signin', validateSignup, signin);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

export default router;