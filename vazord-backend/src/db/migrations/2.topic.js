const { INTEGER, STRING, DATE } = require('sequelize');


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Topics', {
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
