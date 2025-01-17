import createApp from './src/app.mjs';
import pool from './src/pool.mjs';

const app = createApp();
const options = {
  host: 'localhost',
  port: 5432,
  database: 'social_api_access',
  user: 'leodaniels',
  password: '',
};

pool
  .connect(options)
  .then(() => {
    app.listen(3005, () => {
      console.log('Listening on port 3005');
    });
  })
  .catch((err) => {
    console.error(err);
  });
