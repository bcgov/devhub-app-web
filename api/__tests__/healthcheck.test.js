import request from 'supertest';
import app from '../src';

describe('Health Checks', () => {
  test('ehlo returns ok', async () => {
    await request(app).get('/v1/checks/ehlo').expect(200);
  });
});
