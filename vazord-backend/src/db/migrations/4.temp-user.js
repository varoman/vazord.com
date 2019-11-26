const { INTEGER, STRING, DATE, TEXT } = require('sequelize');


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TempUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: INTEGER
            },
            token: {
                type: STRING,
                allowNull: false,
            },
            role: {
                type: STRING,
                allowNull: false,
            },
            email: {
                unique: true,
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
        }, {
            uniqueKeys: {
                actions_unique: {
                    fields: [ 'email' ]
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TempUsers');
    }
};
