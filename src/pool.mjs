import pg from 'pg';

class Pool {
  _pool = null;
  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query('SELECT 1 + 1');
  }
  close() {
    return this._pool.end();
  }
  /**
   * ! Security Risk
   */
  query(sql) {
    return this._pool.query(sql);
  }
}

export default new Pool();
