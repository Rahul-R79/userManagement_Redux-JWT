import express from 'express';
const router = express.Router();
import {login, signin, logout} from '../controllers/authController.js';
import { validateLogin, validateSignin } from '../middleware/validators.js';

router.post('/signin', validateSignin, signin);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

export default router;