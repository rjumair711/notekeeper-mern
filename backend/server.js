import express from 'express';
import noteRouter from './routes/notesRoutes.js';
import dotenv from 'dotenv';
import connectToDatabase from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import cors from 'cors';

dotenv.config();
connectToDatabase();

const app = express();

// ✅ 1. Add CORS middleware FIRST
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ✅ 2. Middleware for parsing JSON
app.use(express.json());

// ✅ 3. Rate limiter (optional, but ensure it's not blocking all traffic)
app.use(rateLimiter);

// ✅ 4. Routes
app.use('/api/notes', noteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on PORT: ${PORT}`);
});
