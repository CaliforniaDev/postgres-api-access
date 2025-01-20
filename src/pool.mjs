/**
 * PostgreSQL Connection Pool
 * This file defines a Pool class that manages the connection pool for PostgreSQL.
 * It provides methods to connect to the database, close the pool, and run queries.
 */

import pg from 'pg';

class Pool {
  _pool = null; // Private variable to hold the pool instance

  // Method to connect to the PostgreSQL database
  connect(options) {
    this._pool = new pg.Pool(options); // Create a new pool with the given options
    return this._pool.query('SELECT 1 + 1'); // Test the connection with a simple query
  }

  // Method to close the pool and end all connections
  close() {
    return this._pool.end();
  }

  // Method to run a query on the database
  query(sql, params) {
    return this._pool.query(sql, params); // Execute the query with the provided SQL and parameters
  }
}

export default new Pool(); // Export an instance of the Pool class
