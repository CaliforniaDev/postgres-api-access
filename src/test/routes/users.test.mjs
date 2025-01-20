import request from 'supertest';
import buildApp from '../../app.mjs';
import UserRepo from '../../repos/user-repo.mjs';

import pool from '../../pool.mjs';
import { password } from 'pg/lib/defaults';

beforeAll(() => {
  return pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'social_api_access',
    user: 'leodaniels',
    password: '',
  });
});

afterAll(() => {
  return pool.close();
});

it('Create a user', async () => {
  const startingCount = await UserRepo.count();
  expect(startingCount).toEqual(0);
  await request(buildApp())
    .post('/users')
    .send({ username: 'testuser', bio: 'test bio' })
    .expect(200);
  const finishCount = await UserRepo.count();
  expect(finishCount).toEqual(1);
});
