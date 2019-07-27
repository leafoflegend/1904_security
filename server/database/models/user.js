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
      beforeUpdate: user => {
        // compare the prev user to the cur user and ensure that they did in fact change the password
        // if they did, rehash the password
        // otherwise dont.
        // if you accidentally rehash the password when they updated their email
      },
    }
  },
);

User.login = function (username, password) {
  return this.findOne({
    where: {
      username,
      password: hash(password),
    },
  });
};

module.exports = User;
