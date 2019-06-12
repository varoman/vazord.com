const sequelize = require('../../db/');
const { STRING } = require('sequelize');
const Article = require('./article');


const Topic = sequelize.define('Topic', {
    title: {
        type: STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        }
    },
}, {});

Article.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });
Topic.hasMany(Article, { foreignKey: 'topicId', as: 'articles' });


module.exports = Topic;
