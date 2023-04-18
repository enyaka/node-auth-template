import http from 'http';
const app = require('./app');
require('./db/db')
require('dotenv').config();

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, () => {
    console.log("Running on port " + port + " and domain is " + process.env.DOMAIN_NAME);
});
