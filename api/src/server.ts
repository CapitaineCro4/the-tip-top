import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { router } from './controllers';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import * as passportConfig from './config/passport';

const app = express();
const prisma = new PrismaClient();

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

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message:
      'Bienvenue sur l\'API du site du jeu concours Thé tip top, pour plus d\'informations veuillez consulter la documentation sur le site',
    documentation: 'https://teetiptop.com/api',
  });
});

app.use('/api', router);
const PORT = process.env.API_PORT || 3002;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
