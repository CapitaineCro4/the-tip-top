import express from 'express';
import { GainRoutes } from './gain/gain.route';
import { UserRoutes } from './user/user.route';
import { SessionRoutes } from './session/session.route';
import { TicketRoutes } from './ticket/ticket.route';
import { GameRoutes } from './game/game.route';
import { AuthRoutes } from './auth/auth.route';

const router = express.Router();

router.use('/gains', GainRoutes);
router.use('/users', UserRoutes);
router.use('/sessions', SessionRoutes);
router.use('/tickets', TicketRoutes);
router.use('/games', GameRoutes);
router.use('/auth', AuthRoutes);
export { router };
