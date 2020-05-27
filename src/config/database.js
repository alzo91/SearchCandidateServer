require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'SearchCandidate',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  operatorAliases: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
