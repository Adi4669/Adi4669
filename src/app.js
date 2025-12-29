import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import donationRoutes from './routes/donations.js';
import requestRoutes from './routes/requests.js';
import campRoutes from './routes/camps.js';
import errorHandler from './middleware/error.js';

const app = express();

app.use(cors({ 
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:8000', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  maxAge: 86400
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/camps', campRoutes);

app.use(errorHandler);

export default app;
