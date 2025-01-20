/**
 * User Repository or Data Access Layer (DAL)
 * This class is responsible for handling all the database queries related to the user model.
 * It should be able to find, insert, update, and delete users in the database.
 */

import pool from '../pool.mjs';
import toCamelCase from './utils/to-camel-case.mjs';

class UserRepo {
  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
   */
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users');
    return toCamelCase(rows);
  }

  /**
   * Retrieves a user by their ID from the database using a prepared statement.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<Object>} A promise that resolves to a user object.
   * @throws Will throw an error if the query fails.
   */
  static async findById(id) {
    // ! Use a prepared statement to prevent SQL injection attacks
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE id = $1 LIMIT 1;`,
      [id],
    );
    return toCamelCase(rows)[0];
  }

  static async insert(username, bio) {
    const { rows } = await pool.query(
      `INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;`,
      [username, bio],
    );
    return toCamelCase(rows)[0];
  }

  /**
   * Updates an existing user in the database.
   * @returns {Promise<void>} A promise that resolves when the user is updated.
   */
  static async update(id, username, bio) {
    const { rows } = await pool.query(
      `UPDATE users 
       SET username = $1, bio = $2
       WHERE id = $3 RETURNING *;`,
      [username, bio, id],
    );
    return toCamelCase(rows)[0];
  }

  /**
   * Deletes a user from the database.
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   */
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *;`,
      [id],
    );
    return toCamelCase(rows)[0];
  }
}

export default UserRepo;
