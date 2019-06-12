const sequelize = require('../../db/');
const { STRING, INTEGER, TEXT } = require('sequelize');


const Article = sequelize.define('Articles', {
    title: {
        type: STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        }
    },
    publicUrl: {
        type: STRING,
        allowNull: false,
    },
    content: {
        type: TEXT,
        allowNull: false,
    },
    // reference to Topic model
    topicId: {
        type: INTEGER,
        allowNull: false
    }
}, {});


module.exports = Article;
