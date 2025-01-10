import cryptoRoutes from './routes/cryptoRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import { connectDB } from './config/db.js';
import { fetchData } from './utils/fetchData.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

nodeCron.schedule('0 */2 * * *', () => {
    console.log('Fetching cryptocurrency data...', Date.now());
    fetchData();
}, {
    timezone: 'Asia/Kolkata'
});

app.use(express.json());
app.use('/api/v1/', cryptoRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
