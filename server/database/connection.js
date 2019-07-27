const Sequelize = require('sequelize');

const DATABASE_URI = process.env.DATABASE_URI || 'postgres://localhost:5432/1904_security';

const db = new Sequelize(DATABASE_URI, {
  logging: false,
});

module.exports = db;
