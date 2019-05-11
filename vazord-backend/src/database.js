const Sequelize = require('sequelize');
const { username, password, database, host, dialect } = require('../config/database').development;


const sequelize = new Sequelize(database, username, password, { host, dialect } );

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
