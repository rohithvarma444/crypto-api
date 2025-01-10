import cryptoRoutes from './routes/cryptoRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import { connectDB } from './config/db.js';
import { fetchData } from './utils/fetchData.js';

dotenv.config();

connectDB();
const app = express();

nodeCron.schedule('0 */2 * * *', () => {
    console.log('Fetching cryptocurrency data...', Date.now());
    fetchData();
}, {
    timezone: 'Asia/Kolkata'
});

app.use(express.json());
app.use('/api/v1/',cryptoRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
