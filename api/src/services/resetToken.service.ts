import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class ResetTokenService {
  static async createToken(email: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 heure

    await prisma.resetToken.create({
      data: {
        token,
        expires,
        userId: user.id,
      },
    });

    return token;
  }

  static async validateToken(token: string): Promise<number | null> {
    const resetToken = await prisma.resetToken.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!resetToken) {
      return null;
    }

    return resetToken.userId;
  }

  static async deleteToken(token: string): Promise<void> {
    await prisma.resetToken.delete({
      where: { token },
    });
  }
}
