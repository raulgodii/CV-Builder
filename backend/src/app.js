import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import emailRoutes from './routes/email.routes.js';
import cvRoutes from './routes/cv.routes.js';

const app = express();

app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}));

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('server running');
});

app.use('/api', authRoutes);
app.use('/api', emailRoutes);
app.use('/api', cvRoutes);

export default app; 