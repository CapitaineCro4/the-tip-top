/* eslint-env node */
/* global process */
const dotenv = require('dotenv');
const path = require('path');

// Charger d'abord le .env à la racine
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

// Puis charger le .env dans le dossier api (s'il existe)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// S'assurer que les variables d'environnement requises sont définies
const requiredEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'JWT_SECRET',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(
      `La variable d'environnement ${envVar} est requise pour les tests`
    );
  }
});
