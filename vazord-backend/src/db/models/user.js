const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../utils/constants');
const sequelize = require('../../db/');
const { STRING } = require('sequelize');


const User = sequelize.define('User', {
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      len: [8, 255],
    }
  },
  role: {
    type: STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'super']],
    }
  },
}, {});

User.beforeCreate(user => {
  return bcrypt.hash(user.password, SALT_ROUNDS).then(hash => {
    user.password = hash;
  });
});

module.exports = User;
