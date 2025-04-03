import request from 'supertest';
import { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import * as serverModule from '../src/server';
import { describe, expect, it, beforeAll, afterAll, jest } from '@jest/globals';

const prisma = new PrismaClient();
const { app } = serverModule as { app: Express };

// Mock des stratégies d'authentification
jest.mock('../src/config/passport', () => ({
  configure: () => {
    // Mock de la configuration de passport
    return {
      use: jest.fn(),
      serializeUser: jest.fn(),
      deserializeUser: jest.fn(),
    };
  },
}));

describe('AppController (e2e)', () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Health Check', () => {
    it('/ (GET)', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    it('/health (GET)', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
