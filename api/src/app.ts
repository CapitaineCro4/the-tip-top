import express from 'express';
import { AuthRoutes } from './controllers/auth/auth.route';
import { GameRoutes } from './controllers/game/game.route';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/games', GameRoutes);

export { app };
