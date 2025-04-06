import express, { RequestHandler } from 'express';
import { NewsletterService } from '../../services/newsletter.service';

const router = express.Router();

router.post('/subscribe', (async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "L'email est requis",
      });
    }

    await NewsletterService.subscribe(email);

    res.status(200).json({
      success: true,
      message: 'Inscription à la newsletter réussie',
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription à la newsletter:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'inscription",
    });
  }
}) as RequestHandler);

export { router as NewsletterRoutes };
