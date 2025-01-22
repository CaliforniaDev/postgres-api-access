import pool from '../pool.mjs';
import format from 'pg-format';
import migrate from 'node-pg-migrate';
import { randomBytes } from 'crypto';

const DEFAULT_OPTIONS = {
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork-test',
  user: 'leodaniels',
  password: '',
};

class Context {
  static async build() {
    // Randomly generate a new database name to ensure isolation
    const roleName = 'a' + randomBytes(4).toString('hex');

    // Connect to the "socialnetwork-test" database
    await pool.connect(DEFAULT_OPTIONS);

    //Create a new role
    // Using pg-format to prevent SQL injection I% means identifier, L% means literal
    await pool.query(
      format('CREATE ROLE %I WITH LOGIN PASSWORD %L', roleName, roleName),
    );

    // Create a schema with the same name
    await pool.query(
      format('CREATE SCHEMA %I AUTHORIZATION %I', roleName, roleName),
    );

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
    return new Context(roleName);
  }
  constructor(roleName) {
    this.roleName = roleName;
  }
  async reset() {
    return pool.query(`
      DELETE FROM users;
    `);
  }
  async close() {
    // Disconnect from the database
    await pool.close();
    // Reconnect as our root user
    await pool.connect(DEFAULT_OPTIONS);
    // Delete the role and schema
    await pool.query(format('DROP SCHEMA %I CASCADE', this.roleName));
    await pool.query(format('DROP ROLE %I', this.roleName));
    // Disconnect from the database
    await pool.close();
  }
}

export default Context;
