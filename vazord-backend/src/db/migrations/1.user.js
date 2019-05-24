const { INTEGER, STRING, DATE } = require('sequelize');


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: INTEGER
            },
            name: {
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
        return queryInterface.dropTable('Users');
    }
};
