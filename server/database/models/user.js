const { STRING } = require('sequelize');
const db = require('../connection');
const hash = require('../utils/hash.js');

const User = db.define(
  'user',
  {
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
    ],
    hooks: {
      beforeCreate: user => {
        user.password = hash(user.password);
      },
    }
  },
);

module.exports = User;
