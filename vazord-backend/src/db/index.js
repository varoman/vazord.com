const Sequelize = require('sequelize');
const { NODE_ENV } = process.env;
const { username, password, database, host, dialect } = require('./config/database')[NODE_ENV];
const { DATABASE_URL } = process.env;

const options = DATABASE_URL ? [ DATABASE_URL ] : [ database, username, password, { host, dialect } ];
const sequelize = new Sequelize(...options);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;
