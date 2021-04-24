const {Client} = require('pg');

const conn = new Client({
  database: 'blog',
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: 'password'
});

conn.connect();

module.exports = conn;
