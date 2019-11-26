const sequelize = require('../../db/');
const { STRING } = require('sequelize');
const uuid = require('uuid/v1');


const TempUser = sequelize.define('TempUser', {
    token: {
        type: STRING,
        allowNull: false,
    },
    email: {
        unique: true,
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },
    role: {
        type: STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'super']],
        }
    },
}, {
    hooks: true,
});

TempUser.beforeCreate(user => user.token = uuid());

module.exports = TempUser;
