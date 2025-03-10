import express from 'express';
import passport from 'passport';
import { TicketService } from '../../services/ticket.service';
import { TicketRepository } from '../../middlewares/ticket/ticket.repository';
import { UpdateTicket } from '../../models/Ticket';
import { HttpError } from '../../utils/HttpError';
const router = express.Router();
const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
  const tickets = await ticketService.findAll();
  const validatedTickets = tickets.filter((ticket) => ticket.used === false);
  res.status(200).json(validatedTickets);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const ticket = await ticketService.findOne(id);
    res.status(200).json(ticket);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(404).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body as UpdateTicket;

  try {
    await ticketService.update(id, data);
    res.status(201).json({ message: 'Ticket updated successfully' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await ticketService.delete(id);
    res.status(201).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export { router as TicketRoutes };
