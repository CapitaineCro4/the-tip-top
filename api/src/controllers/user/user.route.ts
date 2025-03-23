import express from 'express';
import passport from 'passport';
import { UserService } from '../../services/user.service';
import { UserRepository } from '../../middlewares/user/user.repository';
import { UpdateUser } from '../../models/User';
import { HttpError } from '../../utils/HttpError';

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.use(passport.authenticate('jwt', { session: false }));
router.get('/', async (req, res) => {
  const users = await userService.findAll();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userService.findOne(id);
    res.status(200).json(user);
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
  const data = req.body as UpdateUser;
  try {
    await userService.update(id, data);
    res.status(201).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
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
    await userService.delete(id);
    res.status(201).json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export { router as UserRoutes };
