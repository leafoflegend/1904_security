const Sequelize = require('sequelize');
const db = require('../connection');

const Session = db.define('session', {
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Session;
