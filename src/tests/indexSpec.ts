import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

describe('Test API endpoints', () => {
  it('gets the /api/images endpoint and returns 200 for a valid request', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(response.status).toBe(200);
  });

  it('returns 400 if a parameter is missing', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200');
    expect(response.status).toBe(400);
  });

  it('returns 404 for a non-existent image', async () => {
    const response = await request.get('/api/images?filename=nonexistent&width=200&height=200');
    expect(response.status).toBe(404);
  });
});
