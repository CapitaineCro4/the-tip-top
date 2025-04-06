import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class NewsletterService {
  static async subscribe(email: string) {
    try {
      const subscriber = await prisma.newsletterSubscriber.create({
        data: {
          email,
        },
      });
      return subscriber;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error(
          'Cette adresse email est déjà inscrite à la newsletter'
        );
      }
      throw error;
    }
  }

  static async unsubscribe(email: string) {
    return prisma.newsletterSubscriber.delete({
      where: { email },
    });
  }

  static async getAllSubscribers() {
    return prisma.newsletterSubscriber.findMany();
  }
}
