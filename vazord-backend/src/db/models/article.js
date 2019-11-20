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
		references: {
			model: 'Topics',
			key: 'id',
		},
		allowNull: false,
		type: INTEGER
    }
}, {});


module.exports = Article;
