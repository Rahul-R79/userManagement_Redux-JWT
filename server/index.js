import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js'

dotenv.config()
const app = express();

ConnectDB();

app.get('/', (req, res)=>{
    res.send('hello from backend');
});

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
});
