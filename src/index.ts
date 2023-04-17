import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
})