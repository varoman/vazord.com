const http = require('http');
const app  = require('./app');


const port = process.env.PORT || 5000;

http.createServer(app).listen(port);
