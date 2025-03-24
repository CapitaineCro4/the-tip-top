import request from 'supertest';
import { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import * as serverModule from '../src/server';
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';

const prisma = new PrismaClient();
const { app } = serverModule as { app: Express };

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
  });

  describe('Users Routes', () => {
    it('/users (GET) - devrait requérir une authentification', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(401);
    });
  });
});
