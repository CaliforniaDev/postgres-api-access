import request from 'supertest';
import buildApp from '../../app.mjs';
import UserRepo from '../../repos/user-repo.mjs';
import Context from '../context.mjs';

let context;

beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
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
