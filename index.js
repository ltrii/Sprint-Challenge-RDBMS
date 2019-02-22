const express = require('express');
const helmet = require('helmet');
const router = require('./routes/router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/', router);

const port = process.env.PORT || 5220;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));