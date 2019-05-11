require('dotenv').config();
const http = require('http');
const app  = require('./app');
require('./database');


const port = process.env.PORT || 5000;

http.createServer(app).listen(port);
