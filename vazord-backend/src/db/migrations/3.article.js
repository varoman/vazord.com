const { INTEGER, STRING, DATE, TEXT } = require('sequelize');


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Articles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: INTEGER
            },
            title: {
                type: STRING,
                allowNull: false,
            },
            publicUrl: {
                type: STRING,
                allowNull: false,
            },
            content: {
                type: TEXT,
                allowNull: false,
            },
            topicId: {
                references: {
                    model: 'Topics',
					key: 'id',
					as: 'topicId',
                },
				onUpdate: 'cascade',
				onDelete: 'cascade',
                allowNull: false,
                type: INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DATE
            },
            updatedAt: {
                allowNull: false,
                type: DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Topics');
    }
};
