const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./router');
require('./db');


const app = express();

app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
        allowMethods: [ 'GET', 'POST', ],
        allowedHeaders: [ 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    })
);
app.use('/api', api);

module.exports = app;
