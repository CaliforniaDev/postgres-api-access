/**
 * User Repository
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
   * Retrieves a user by their ID from the database.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<Object>} A promise that resolves to a user object.
   * @throws Will throw an error if the query fails.
   * @note This method contains a security issue due to SQL injection vulnerability.
   */
  static async findById(id) {
    //! WARNING: REALLY BIG SECURITY ISSUE!
    const { rows } = await pool.query(`
      SELECT * FROM users WHERE id = ${id} LIMIT 1;
    `);
    return toCamelCase(rows)[0];
  }

  /**
   * Inserts a new user into the database.
   * @returns {Promise<void>} A promise that resolves when the user is inserted.
   */
  static async insert() {}

  /**
   * Updates an existing user in the database.
   * @returns {Promise<void>} A promise that resolves when the user is updated.
   */
  static async update() {}

  /**
   * Deletes a user from the database.
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   */
  static async delete() {}
}

export default UserRepo;
