/**
 * User Repository
 * This class is responsible for handling all the database queries related to the user model.
 * It should be able to find, insert, update, and delete users in the database.
 */

import pool from '../pool.mjs';

class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users');
    const parsedRows = rows.map((row) => {
      return Object.entries(row).reduce((acc, [key, value]) => {
        const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
          $1.toUpperCase().replace('_', ''),
        );
        acc[camelCase] = value;
        return acc;
      }, {});
    });
    return parsedRows;
  }

  static async findById() {}

  static async insert() {}

  static async update() {}

  static async delete() {}
}

export default UserRepo;
