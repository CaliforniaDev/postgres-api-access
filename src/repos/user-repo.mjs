/**
 * User Repository
 * This class is responsible for handling all the database queries related to the user model.
 * It should be able to find, insert, update, and delete users in the database.
 */

import pool from '../pool.mjs';
import toCamelCase from './utils/to-camel-case.mjs';


class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users');
    return toCamelCase(rows);
  }

  static async findById() {}

  static async insert() {}

  static async update() {}

  static async delete() {}
}

export default UserRepo;
