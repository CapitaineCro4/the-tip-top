import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { router } from './controllers';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import * as passportConfig from './config/passport';
import client from 'prom-client'; // Importe prom-client

const app = express();
const prisma = new PrismaClient();

// Active la collecte des métriques par défaut (CPU, mémoire, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(
  session({
    secret: 'keyboard-cat',
    resave: true,
    saveUninitialized: true,
  })
);

passportConfig.configure(app);

// Endpoint pour exposer les métriques à Prometheus
app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message:
      "Bienvenue sur l'API du site du jeu concours Thé tip top, pour plus d'informations veuillez consulter la documentation sur le site",
    documentation: 'https://dsp5-archi-f24a-15m-g4.fr/api',
  });
});

app.use('/api', router);

// Ne démarrer le serveur que si ce fichier est exécuté directement
const isMainModule =
  process.argv[1]?.endsWith('server.ts') ||
  process.argv[1]?.endsWith('server.js');
if (isMainModule) {
  const PORT = process.env.API_PORT || 3002;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { app, prisma };
