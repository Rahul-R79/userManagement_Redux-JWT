import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import authRoute from './routes/authRoute.js';
import userRouter from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

ConnectDB();

app.use('/api/auth', authRoute);
app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
