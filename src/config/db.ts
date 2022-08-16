import mariadb from 'mariadb';
import 'dotenv/config';

const pool = Object.freeze(
  mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    database: process.env.DB_NAME,
    timezone: 'utc',
  })
);

export default pool;
