import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Route de connexion
const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Route de connexion Google
const googleAuth: RequestHandler = async (req, res) => {
  try {
    const { email, firstName, lastName, photoURL } = req.body;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Créer un nouvel utilisateur
      user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: '', // Pas de mot de passe pour les utilisateurs Google
          gender: 'non_specifie',
          birthDate: new Date(), // Date par défaut
          isAdmin: false,
        },
      });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Erreur de connexion Google:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

router.post('/login', login);
router.post('/google', googleAuth);

export default router;
