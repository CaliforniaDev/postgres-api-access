import request from 'supertest';
import buildApp from '../../app.mjs';
import UserRepo from '../../repos/user-repo.mjs';

import pool from '../../pool.mjs';

beforeAll(() => {
  return pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork-test',
    user: 'leodaniels',
    password: '',
  });
});

afterAll(() => {
  return pool.close();
});

it('Create a user', async () => {
  const startingCount = await UserRepo.count();
  await request(buildApp())
    .post('/users')
    .send({ username: 'testuser', bio: 'test bio' })
    .expect(200);
  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
