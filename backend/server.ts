import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import catRoutes from './routes/catRoutes.js';
import personRoutes from './routes/personRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cats', catRoutes);
app.use('/api/people', personRoutes);
app.use('/api/auth', authRoutes);

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL!)
  .then(() => console.log('Sikeres csatlakozás a MongoDB-hez (TypeScript)'))
  .catch(err => console.error('Hiba a MongoDB csatlakozáskor:', err));

app.get('/', (req: Request, res: Response) => {
  res.send('CicaMenhely TypeScript API fut...');
});

app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} címen (TS)`);
});
