import request from 'supertest';
import buildApp from '../../app.mjs';
import UserRepo from '../../repos/user-repo.mjs';

import pool from '../../pool.mjs';
import Context from '../context.mjs';
// import { randomBytes } from 'crypto';
// import migrate from 'node-pg-migrate';
// import format from 'pg-format';

beforeAll(async () => {
  const context = await Context.build();
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
