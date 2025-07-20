import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js'
import authRoute from './routes/authRoute.js'
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config()
const app = express();
app.use(express.json())

ConnectDB();

app.use('/api/auth', authRoute);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
});
