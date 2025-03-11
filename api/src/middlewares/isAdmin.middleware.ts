import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: number;
  isAdmin: boolean;
}

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token non fourni' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JwtPayload;

    if (!decoded.isAdmin) {
      res.status(403).json({ message: 'Accès non autorisé' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      res.status(403).json({ message: 'Accès non autorisé' });
      return;
    }

    next();
  } catch (error) {
    console.error('Erreur de vérification admin:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
};
