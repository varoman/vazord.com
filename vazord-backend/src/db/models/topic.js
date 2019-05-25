const sequelize = require('../../db/');
const { STRING } = require('sequelize');


const Topic = sequelize.define('Topic', {
    title: {
        type: STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        }
    },
}, {});

module.exports = Topic;
