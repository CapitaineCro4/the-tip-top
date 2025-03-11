import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const router = Router();
const prisma = new PrismaClient();

// Route pour créer un admin
const createAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName, gender, birthDate } =
      req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Cet utilisateur existe déjà' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        gender,
        birthDate: new Date(birthDate),
        isAdmin: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json(admin);
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error);
    res.status(500).json({ message: "Erreur lors de la création de l'admin" });
  }
};

// Route pour obtenir les statistiques
const getStats: RequestHandler = async (_req, res) => {
  try {
    const [userCount, gameCount, activeSessionCount] = await Promise.all([
      prisma.user.count(),
      prisma.game.count(),
      prisma.session.count({
        where: {
          endDate: {
            gt: new Date(),
          },
        },
      }),
    ]);

    res.json({
      users: userCount,
      games: gameCount,
      activeSessions: activeSessionCount,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des statistiques' });
  }
};

// Route pour obtenir la liste des utilisateurs
const getUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        gender: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            games: true,
          },
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

router.post('/create', isAdmin, createAdmin);
router.get('/stats', isAdmin, getStats);
router.get('/users', isAdmin, getUsers);

export default router;
