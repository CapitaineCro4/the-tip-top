import express from 'express';
import passport from 'passport';
import { GameService } from '../../services/game.service';
import { GameRepository } from '../../middlewares/game/game.repository';
import { HttpError } from '../../utils/HttpError';
import { TicketService } from '../../services/ticket.service';
import { TicketRepository } from '../../middlewares/ticket/ticket.repository';

const router = express.Router();
const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);
const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
  const games = await gameService.findAll();
  res.status(200).json(games);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const game = await gameService.findOne(id);
    res.status(200).json(game);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(404).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/', async (req, res) => {
  const data = req.body as { ticketCode: string; userId: number };
  try {
    const ticket = await ticketService.findOneBy({
      code: data.ticketCode.toUpperCase(),
    });

    if (ticket.used) {
      throw HttpError.badRequest('Ticket already used', ['ticketCode']);
    }

    await gameService.create({
      ticketId: ticket.id,
      userId: data.userId,
    });
    await ticketService.update(ticket.id, {
      used: true,
    });
    res
      .status(201)
      .json({ message: 'Game created successfully', gain: ticket.gain });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export { router as GameRoutes };
