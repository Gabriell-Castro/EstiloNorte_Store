import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { env } from './config/env.js';

const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => {
  res.json({ message: 'API EstiloNorte online.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

export default app;
