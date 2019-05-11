const sequelize = require('../../db/index');
const { STRING } = require('sequelize');


const User = sequelize.define('User', {
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
}, {});

User.associate = function(models) {
  // associations can be defined here
};

module.exports = User;
