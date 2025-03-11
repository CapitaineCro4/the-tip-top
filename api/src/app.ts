import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Route de test pour vérifier que l'API fonctionne
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
