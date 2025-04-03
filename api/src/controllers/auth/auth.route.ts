import express, { RequestHandler } from 'express';
import { UserService } from '../../services/user.service';
import { UserRepository } from '../../middlewares/user/user.repository';
import { CreateUser, User } from '../../models/User';
import { HttpError } from '../../utils/HttpError';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { passportConfig } from '../../config/passport';
import { GameService } from '../../services/game.service';
import { GameRepository } from '../../middlewares/game/game.repository';
import { ResetTokenService } from '../../services/resetToken.service';
import { EmailService } from '../../services/email.service';
import { Password } from '../../utils/Password';
import { validatePassword } from '../../utils/validation';
import {
  CALLBACK_FRONTEND_URL,
  LOGIN_FRONTEND_URL,
} from '../../shared/constantes';

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

router.post('/employe/login', async (req, res) => {
  try {
    passport.authenticate(
      'employe/login',
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

router.get('/google', (req, res, next) => {
  console.log('Initiating Google auth...');
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
});

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      console.log('Google auth successful, user:', req.user);
      const user = req.user as User;
      const token = jwt.sign({ id: user.id }, passportConfig.JWT_SECRET, {
        expiresIn: '7d',
      });

      // Rediriger vers le frontend avec le token
      res.redirect(`${CALLBACK_FRONTEND_URL}?token=${token}`);
    } catch (error: unknown) {
      console.error("Erreur lors de l'authentification Google:", error);
      res.redirect(`${LOGIN_FRONTEND_URL}?error=auth_failed`);
    }
  }
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  async (req, res) => {
    try {
      const user = req.user as User;
      const token = jwt.sign({ id: user.id }, passportConfig.JWT_SECRET, {
        expiresIn: '7d',
      });

      // Rediriger vers le frontend avec le token
      res.redirect(`${CALLBACK_FRONTEND_URL}?token=${token}`);
    } catch (error: unknown) {
      console.error("Erreur lors de l'authentification Facebook:", error);
      res.redirect(`${LOGIN_FRONTEND_URL}?error=auth_failed`);
    }
  }
);

router.post('/forgot-password', (async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "L'email est requis" });
  }

  ResetTokenService.createToken(email)
    .then(async (token) => {
      if (!token) {
        return res.status(200).json({
          message:
            "Si l'email existe, un lien de réinitialisation a été envoyé",
        });
      }

      await EmailService.sendResetPasswordEmail(email, token);

      res.status(200).json({
        message: "Si l'email existe, un lien de réinitialisation a été envoyé",
      });
    })
    .catch((error) => {
      console.error('Erreur lors de la demande de réinitialisation:', error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    });
}) as RequestHandler);

router.post('/reset-password', (async (
  req: express.Request,
  res: express.Response
) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({
      message: 'Le token et le mot de passe sont requis',
    });
  }

  ResetTokenService.validateToken(token)
    .then(async (userId) => {
      if (!userId) {
        return res.status(400).json({
          message: 'Token invalide ou expiré',
        });
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({
          message: 'Mot de passe invalide',
          errors: passwordValidation.errors,
        });
      }

      await userService.update(userId, {
        password: await Password.crypt(password),
      });

      await ResetTokenService.deleteToken(token);

      res.status(200).json({
        message: 'Mot de passe mis à jour avec succès',
      });
    })
    .catch((error) => {
      console.error(
        'Erreur lors de la réinitialisation du mot de passe:',
        error
      );
      res.status(500).json({ message: 'Une erreur est survenue' });
    });
}) as RequestHandler);

export { router as AuthRoutes };
