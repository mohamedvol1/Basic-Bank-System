const pgp = require('pg-promise')();
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'bankdb',
  user: 'postgres',
  password: '0001',
};

const db = pgp(cn);

module.exports = db