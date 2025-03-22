import express from 'express';
import { UserService } from '../../services/user.service';
import { UserRepository } from '../../middlewares/user/user.repository';
import { CreateUser, User } from '../../models/User';
import { HttpError } from '../../utils/HttpError';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { passportConfig } from '../../config/passport';
import { GameService } from '../../services/game.service';
import { GameRepository } from '../../middlewares/game/game.repository';

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.status(200).json(req.user as User);
  }
);

router.get(
  '/me/games',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = (req.user as User).id;
    const games = await gameService.findAll({ userId });
    res.status(200).json(games);
  }
);

router.post('/register', async (req, res) => {
  const data = req.body as CreateUser;
  try {
    const user = await userService.create(data);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    passport.authenticate(
      'login',
      { session: false },
      async (
        err: Error | null,
        user: User | false,
        info: { message: string }
      ) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        if (!user) {
          return res.status(404).json({ message: info.message });
        }

        const token = jwt.sign({ id: user.id }, passportConfig.JWT_SECRET, {
          expiresIn: '7d',
        });
        res.status(201).json({ token });
      }
    )(req, res);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    passport.authenticate(
      'admin/login',
      { session: false },
      async (
        err: Error | null,
        user: User | false,
        info: { message: string }
      ) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        if (!user) {
          return res.status(404).json({ message: info.message });
        }

        const token = jwt.sign({ id: user.id }, passportConfig.JWT_SECRET, {
          expiresIn: '7d',
        });
        res.status(201).json({ token });
      }
    )(req, res);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(400).json({ message: error.message, target: error.target });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user as User;
      const token = jwt.sign({ id: user.id }, passportConfig.JWT_SECRET, {
        expiresIn: '7d',
      });

      // Rediriger vers le frontend avec le token
      res.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/callback?token=${token}`
      );
    } catch (error: unknown) {
      console.error("Erreur lors de l'authentification Google:", error);
      res.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login?error=auth_failed`
      );
    }
  }
);

export { router as AuthRoutes };
