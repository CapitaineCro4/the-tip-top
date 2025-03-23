/* global jest */
import dotenv from 'dotenv';
import path from 'path';

// Charger le fichier .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Configuration globale pour les tests
jest.setTimeout(30000); // 30 secondes

// Vérification des variables d'environnement
const requiredEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'JWT_SECRET',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(
      `Warning: La variable d'environnement ${envVar} n'est pas définie`
    );
  }
});
