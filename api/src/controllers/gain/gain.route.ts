import express from 'express';
import passport from 'passport';
import { GainService } from '../../services/gain.service';
import { GainRepository } from '../../middlewares/gain/gain.repository';
import { CreateGain, UpdateGain } from '../../models/Gain';
import { HttpError } from '../../utils/HttpError';

const router = express.Router();
const gainRepository = new GainRepository();
const gainService = new GainService(gainRepository);

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
  const gains = await gainService.findAll();
  res.status(200).json(gains);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const gain = await gainService.findOne(id);
    res.status(200).json(gain);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(404).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/', async (req, res) => {
  const data = req.body as CreateGain;

  try {
    const gain = await gainService.create(data);
    res.status(201).json(gain);
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
  const data = req.body as UpdateGain;

  try {
    await gainService.update(id, data);
    res.status(201).json({ message: 'Gain updated successfully' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await gainService.delete(id);
    res.status(201).json({ message: 'Gain deleted successfully' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export { router as GainRoutes };
