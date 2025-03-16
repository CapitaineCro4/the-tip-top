import express from 'express';
import passport from 'passport';
import { SessionService } from '../../services/session.service';
import { SessionRepository } from '../../middlewares/session/session.repository';
import { CreateSession, UpdateSession } from '../../models/Session';
import { TicketRepository } from '../../middlewares/ticket/ticket.repository';
import { TicketService } from '../../services/ticket.service';
import { GainRepository } from '../../middlewares/gain/gain.repository';
import { GainService } from '../../services/gain.service';
import { GameManager } from '../../utils/GameManager';
import { HttpError } from '../../utils/HttpError';
const router = express.Router();
const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository);

const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);
const gainRepository = new GainRepository();
const gainService = new GainService(gainRepository);

const TICKET_QUANTITY_PER_SESSION = 4;

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
  const sessions = await sessionService.findAll();
  const validatedSessions = sessions.map((session) => {
    return {
      ...session,
      tickets: session.tickets.filter((ticket) => ticket.used === false),
    };
  });
  res.status(200).json(validatedSessions);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const session = await sessionService.findOne(id);
    const validatedSession = {
      ...session,
      tickets: session.tickets.filter((ticket) => ticket.used === false),
    };
    res.status(200).json(validatedSession);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(404).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/', async (req, res) => {
  const data = req.body as CreateSession & { ticketsQuantity?: number };

  try {
    const { ticketsQuantity, ...sessionData } = data;
    const sessionId = await sessionService.create(sessionData);
    const gains = await gainService.findAll();

    const totalRecords = ticketsQuantity || TICKET_QUANTITY_PER_SESSION;
    const batchSize = 4;
    const totalBatches = Math.ceil(totalRecords / batchSize);

    console.info(
      `Generating ${totalRecords} tickets in ${totalBatches} batches of ${batchSize} tickets each`
    );

    for (let i = 0; i < totalBatches; i++) {
      const batch = Array.from({ length: batchSize }, () => ({
        totalQuantityGain: 1,
        gainId: GameManager.getRandomGain(gains).id,
        sessionId,
      }));
      await ticketService.createMany(batch);
      console.info(`Batch ${i + 1} created`);
    }

    res.status(201).json(sessionId);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const data = req.body as UpdateSession;
    await sessionService.update(id, data);
    res.status(201).json({ message: 'Session updated successfully' });
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
    await sessionService.delete(id);
    res.status(201).json({ message: 'Session deleted successfully' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export { router as SessionRoutes };
