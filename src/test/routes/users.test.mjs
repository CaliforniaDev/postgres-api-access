import request from 'supertest';
import buildApp from '../../app.mjs';
import UserRepo from '../../repos/user-repo.mjs';

import pool from '../../pool.mjs';
import { randomBytes } from 'crypto';
import migrate from 'node-pg-migrate';
import format from 'pg-format';

beforeAll(async () => {
  // Randomly generate a new database name to ensure isolation
  const roleName = 'a' + randomBytes(4).toString('hex');

  // Connect to the "socialnetwork-test" database
  await pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork-test',
    user: 'leodaniels',
    password: '',
  });

  //Create a new role
  await pool.query(`CREATE ROLE ${roleName} WITH LOGIN PASSWORD '${roleName}'`);

  // Create a schema with the same name
  await pool.query(`CREATE SCHEMA ${roleName} AUTHORIZATION ${roleName}`);

  // Disconnect from the database
  await pool.close();

  // Run our migrations in the new schema
  await migrate({
    schema: roleName,
    direction: 'up',
    log: () => {},
    noLock: true, // Prevents the migration from hanging if there are other connections
    dir: 'migrations',
    databaseUrl: {
      host: 'localhost',
      port: 5432,
      database: 'socialnetwork-test',
      user: roleName,
      password: roleName,
    },
  });

  // Connect to database as the new role
  await pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork-test',
    user: roleName,
    password: roleName,
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
